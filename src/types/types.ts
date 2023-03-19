import { Router } from "express";
import mongoose from "mongoose";
import { DriverModel, RideRequestModel } from "../api/models/model";

export type AppRouter = typeof Router;
export type DataAdaptor = typeof mongoose;

// model types
export type DriverModelType = typeof DriverModel;
export type RideRequestModelType = typeof RideRequestModel;
