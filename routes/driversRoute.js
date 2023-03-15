import { Router } from "express";
import DriverController from "../controllers/driverController.js";

const route = Router();

route.post("/create", DriverController.createDriver);

route.get("/:driverId", DriverController.getDriver);

route.put("/:driverId", DriverController.editDriver);

route.post(":driverId/status", DriverController.setDriverStatus);

export default route;