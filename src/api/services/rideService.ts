import { DriverModel } from "../models/driverModel";

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
  const driver: any = await DriverModel.findOne(query).lean();
  // update driver availability to matched
  if (driver)
    await DriverModel.findByIdAndUpdate(driver._id, {
      availability: "available",
    });
  return driver;
};
