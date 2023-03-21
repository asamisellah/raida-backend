import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
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
    type: String,
    enum: ["unavailable", "matched", "in_ride", "available"],
    default: "available",
  },
});

export const DriverModel = mongoose.model("Driver", driverSchema);
