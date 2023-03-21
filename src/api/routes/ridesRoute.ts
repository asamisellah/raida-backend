import { Router } from "express";
import RideController from "../controllers/rideController";
import validate from "../middlewares/validate.middlewares";
import rideSchema from "../validations/rideValidations";

const route = Router();

route.post("/request", validate(rideSchema), RideController.requestRide);

route.get("/:rideId", RideController.getRide);

route.put("/:rideId", RideController.editRide);

route.get("/:rideId/status", RideController.getRideStatus);

route.get("/drivers/:driverId", RideController.getDriverRides);

route.get("/users/:userId", RideController.getUserRides);

const htmlRoute = Router();

export default route;
