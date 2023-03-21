import { Driver } from "../../types/interfaces";
import { DriverModel as model } from "../models/driverModel";

async function saveDriver(driver: Driver) {
  const { location } = driver;
  // save driver in db
  await model.create({
    ...driver,
    location: { coordinates: [location.longitude, location.latitude] },
  });
}

async function getDriver(driverId: string) {
  // retrieve driver from db
  const driver = await model.findById(driverId, "-password").lean();
  return driver;
}

async function updateAvailability(availability: Object, driverId: String) {
  return await model
    .findByIdAndUpdate(driverId, availability, { new: true })
    .lean();
}

export default { saveDriver, getDriver, updateAvailability };
