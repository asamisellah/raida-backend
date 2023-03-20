import mongoose, { ObjectId } from "mongoose";

const { ObjectId } = mongoose.Types;

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    type: {
      type: String,
      default: "Point",
      index: true,
    },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  rating: {
    type: Number,
    default: 0,
  },
  licenseNumber: { type: String },
  licensePlate: { type: String, unique: true, required: true },
  carModel: { type: String, required: true },
  carMake: { type: String, required: true },
  carDescription: String,
  availability: {
    // rename to availability
    type: String,
    enum: ["unavailable", "matched", "in_ride", "available"],
    default: "available",
  },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// check if the user requesting ride is valid user
const rideRequestSchema = new mongoose.Schema({
  pickup: {
    type: {
      type: String,
      default: "Point",
      required: true,
    },
    coordinates: [Number],
  },
  destination: {
    type: {
      type: String,
      default: "Point",
      required: true,
    },
    coordinates: [Number],
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  passangerId: { type: ObjectId, required: true },
  driverId: ObjectId,
  rideStatus: {
    type: String,
    enum: ["created", "cancelled", "matched", "started", "completed"],
    default: "created",
  },
});

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

// @ts-ignore
export const DriverModel = mongoose.model("Driver", driverSchema);
export const UserModel = mongoose.model("User", userSchema);
export const RideRequestModel = mongoose.model(
  "RideRequest",
  rideRequestSchema
);

// mongoose.drivers.createIndex({ location: "2dsphere" });
