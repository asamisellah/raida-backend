import { Router } from "express";
import PassangerController from "../controllers/passangerController";

const route = Router();

route.post("/create", PassangerController.createUser);

route.get("/:userId", PassangerController.getUser);

route.put("/:userId", PassangerController.editUser);

export default route;
