import { Router } from "express";
import RideController from "../controllers/rideController";

const route = Router();

route.post("/request", RideController.requestRide);

route.get("/:rideId", RideController.getRide);

route.put("/:rideId", RideController.editRide);

route.get("/:rideId/status", RideController.getRideStatus);

route.get("/drivers/:driverId", RideController.getDriverRides);

route.get("/users/:userId", RideController.getUserRides);

export default route;