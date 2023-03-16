import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  licenseNumber: { type: String, required: true },
  licensePlate: { type: String, unique: true, required: true },
  carModel: { type: String, required: true },
  carMake: { type: String, required: true },
  carDescription: String,
  verified: { type: Boolean, default: false },
  available: { type: Boolean, default: false },
});

const rideRequestSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

export const DriverModel = mongoose.model("Driver", driverSchema);
export const RideRequestModel = mongoose.model("RideRequest", driverSchema);
