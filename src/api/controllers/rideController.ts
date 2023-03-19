import { Request, Response } from "express";
import { findNearbyDrivers, RideRequestModel } from "../models/model";

// env variable
const maxDistance = 2000;

export const requestRide = async (req: Request, res: Response) => {
  // create ride
  // find/match driver service called
  // handle edge cases
  const { pickup } = req.body;

  saveRide(req.body);
  const driver = matchDriver(pickup);
  // notify matched driver 


  // we have a list of drivers for matching
  // send out msg to the first driver
  // put drivers in queue and then send message to each driver in order of the queue
  // if driver accepts, we end the notifications sending
  // if driver rejects, pop the item and select next item in the queue

  // todo: sending notification to driver

  console.log("Drivers", driver);

  res.send("Request Ride endpoint");
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
    { available: "standby" }
  );

  return driver;
};

const saveRide = async (payload: any) => {
  const newRideRequest = new RideRequestModel(payload);
  await newRideRequest
    .save()
    .then((doc) => {
      // Add debug log for success saving to DB
      console.log(doc);
    })
    .catch((err) => {
      console.log(err);
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
