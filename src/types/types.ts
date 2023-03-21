import { Router } from "express";
import mongoose from "mongoose";
import { RideRequestModel } from "../api/models/rideModel";
import { DriverModel } from "../api/models/driverModel";

export type AppRouter = typeof Router;
export type DataAdaptor = typeof mongoose;

// model types
export type DriverModelType = typeof DriverModel;
export type RideRequestModelType = typeof RideRequestModel;

export type Availability = "available" | "unavailable" | "in_ride" | "matched";
