import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

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

export const RideRequestModel = mongoose.model(
  "RideRequest",
  rideRequestSchema
);
