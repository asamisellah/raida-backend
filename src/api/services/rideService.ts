import { Ride } from "../../types/interfaces";
import { RideRequestModelType } from "../../types/types";
import { DriverModel } from "../models/driverModel";
import { UserModel } from "../models/passangerModel";
import { RideRequestModel } from "../models/rideModel";

export const saveRide = async (ride: Ride) => {
  const newRideRequest = new RideRequestModel({
    ...ride,
    pickup: { coordinates: [ride.pickup.longitude, ride.pickup.latitude] },
    destination: {
      coordinates: [ride.destination.longitude, ride.destination.latitude],
    },
  });
  const rideRequest = await newRideRequest.save().then((doc) => doc);

  // get passanger info
  const passanger = await UserModel.findById(
    rideRequest.passangerId,
    "name phoneNumber"
  ).lean();
  const { _id, pickup, destination } = rideRequest;
  return { _id, pickup, destination, passanger };
};

export const findNearbyDrivers = async (
  longitude: number,
  latitude: number,
  maxDistance: number,
  options = {}
) => {
  const query = {
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [longitude, latitude] },
        $maxDistance: maxDistance,
      },
    },
    ...options,
  };

  // todo: many suitable drivers incase the first rejects request
  const driver: any = await DriverModel.findOne(
    query,
    "-username -email -availability -password"
  ).lean();
  // update driver availability to matched
  if (driver)
    await DriverModel.findByIdAndUpdate(driver._id, {
      availability: "available",
    });
  return driver;
};
