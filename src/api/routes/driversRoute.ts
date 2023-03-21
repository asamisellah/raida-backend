import { Router } from "express";
import driverController from "../controllers/driverController";
import validate from "../middlewares/validate.middlewares";
import driverSchema from "../validations/driverValidations";

const route = Router();

route.post("/create", validate(driverSchema),driverController.createDriver);

route.get("/:driverId", driverController.getDriver);

route.put("/:driverId", driverController.editDriver);

route.post("/:driverId/status", driverController.setDriverStatus);

export default route;
