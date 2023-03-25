import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { io } from "../../config/socket.io";
import { findNearbyDrivers, saveRide } from "../services/rideService";
import { resBodyBuilder } from "../utils/commonUtils";

// env variable
const maxDistance = 2000;

// Passangers and drivers can only have one ride request at a time

export const requestRide = async (req: Request, res: Response) => {
  // create ride
  // find/match driver service called
  // handle edge cases
  const {
    pickup: { longitude, latitude },
  } = req.body;

  const rideRequest: any = await saveRide(req.body);

  const matchedDriver = await findNearbyDrivers(
    longitude,
    latitude,
    maxDistance,
    { availability: "available" }
  );

  if (!matchedDriver)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(resBodyBuilder("No driver found", {}, true));

  // sending notification to driver
  await notifyDriver(matchedDriver, rideRequest, res);
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

const notifyDriver = async (matchedDriver: any, rideRequest: any, res: any) => {
  /** if driver rejects, select the next driver in the queue
      if driver does not respond within 30 seconds, select the next driver in the queue
      if no driver accepts the ride request, we end the notifications sending and close the connection
      if driver accepts, we end the notifications sending and close the connection
  **/

  io.on("connection", async (socket) => {
    console.log(`Driver ${matchedDriver._id} connected to socket ${socket.id}`);
    // Set a timeout of 3 seconds

    // Emit rideRequest event
    socket.emit("rideRequest", rideRequest);

    // Handle acceptRide event
    socket.on("acceptRide", () => {
      // Update ride request status to accepted
      console.log(`Driver ${matchedDriver._id} accepted ride request`);
      return res
        .status(200)
        .send(resBodyBuilder("Driver found", matchedDriver, false));
    });

    // Handle rejectRide event
    socket.on("rejectRide", () => {
      // Update ride request status to rejected
      console.log(`Driver ${matchedDriver._id} rejected ride request`);

      return res.status(404).send(resBodyBuilder("No driver found", {}, true));
    });

    // Handle disconnect event
    // socket.on("disconnect", () => {
    //   console.log(`Driver ${matchedDriver._id} disconnected`);
    // });

    // Handle connect_error event
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      socket.disconnect();
      res.status(500);
    });
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
