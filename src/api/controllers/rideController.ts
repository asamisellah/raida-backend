import { Request, Response } from "express";
import { io } from "../../config/socket.io";
import { RideRequestModel } from "../models/rideModel";
import { findNearbyDrivers } from "../services/rideService";

// env variable
const maxDistance = 2000;

// Passangers and drivers can only have one ride request at a time

export const requestRide = async (req: Request, res: Response) => {
  // create ride
  // find/match driver service called
  // handle edge cases
  const { pickup } = req.body;

  const rideRequest = await saveRide(req.body);
  const matchedDriver = await matchDriver(pickup);

  console.log("MatchedDriver", matchedDriver);

  // todo: sending notification to driver
  notifyDriver(matchedDriver, rideRequest, res);
};

export const getRide = (req: Request, res: Response) => {
  res.send("Get Ride endpoint");
};

export const editRide = (req: Request, res: Response) => {
  res.send("Edit Ride details endpoint");
};

export const getUserRides = (req: Request, res: Response) => {
  res.send("Get user rides");
};

export const getDriverRides = (req: Request, res: Response) => {
  res.send("Get driver rides");
};

export const getRideStatus = (req: Request, res: Response) => {
  res.send("Get ride status");
};

const matchDriver = async (pickup: any) => {
  const driver = await findNearbyDrivers(
    pickup.longitude,
    pickup.latitude,
    maxDistance,
    { availability: "available" }
  );

  return driver;
};

const saveRide = async (payload: any) => {
  const newRideRequest = new RideRequestModel(payload);
  await newRideRequest
    .save()
    .then((doc) => {
      // Add debug log for success saving to DB
      // console.log(doc);
    })
    .catch((err) => {
      // console.log(err);
    });
};

const notifyDriver = async (matchedDriver: any, rideRequest: any, res: any) => {
  // if driver rejects, select the next driver in the queue
  // if driver does not respond within 30 seconds, select the next driver in the queue
  // if no driver accepts the ride request, we end the notifications sending and close the connection
  // if driver accepts, we end the notifications sending and close the connection

  io.on("connection", async (socket) => {
    console.log(`Driver ${matchedDriver._id} connected to socket ${socket.id}`);

    socket.emit("rideRequest", rideRequest);

    socket.on("acceptRide", (socket) => {
      // Update ride request status to accepted
      console.log(`Driver ${matchedDriver._id} accepted ride request`);

      res.sendStatus(200);
    });

    socket.on("rejectRide", () => {
      // Update ride request status to accepted
      console.log(`Driver ${matchedDriver._id} accepted ride request`);
      res.sendStatus(404);
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      err.disconnect();
    });

    // end connection
  });
};

export default {
  requestRide,
  getRide,
  editRide,
  getUserRides,
  getDriverRides,
  getRideStatus,
};
