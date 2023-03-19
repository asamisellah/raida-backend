import { Router } from "express";
import driverController from "../controllers/driverController";

const route = Router();

route.post("/create", driverController.createDriver);

route.post("/verify/:driverId", driverController.createDriver);

route.get("/:driverId", driverController.getDriver);

route.put("/:driverId", driverController.editDriver);

route.post("/:driverId/status", driverController.setDriverStatus);

export default route;
