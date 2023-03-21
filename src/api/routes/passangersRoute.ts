import { Router } from "express";
import PassangerController from "../controllers/passangerController";
import validate from "../middlewares/validate.middlewares";
import userSchema from "../validations/UserValidations";

const route = Router();

route.post("/create", validate(userSchema), PassangerController.createUser);

route.get("/:userId", PassangerController.getUser);

route.put("/:userId", PassangerController.editUser);

export default route;
