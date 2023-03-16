import { Router } from "express";
import DriverController from "../controllers/driverController";

const route = Router();

route.post("/create", DriverController.createDriver);

route.post("/verify/:driverId", DriverController.createDriver);

route.get("/:driverId", DriverController.getDriver);

route.put("/:driverId", DriverController.editDriver);

route.post(":driverId/findRide", DriverController.setDriverStatus);

export default route;