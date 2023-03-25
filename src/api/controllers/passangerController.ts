import { Request, Response } from "express";
import { UserModel } from "../models/passangerModel";
import { encryptPass, resBodyBuilder } from "../utils/commonUtils";
import { User, ResponseType, Status } from "../../types/interfaces";
import { StatusCodes } from "http-status-codes";

export const createUser = async (req: Request, res: Response) => {
  try {
    const reqbody: User = req.body;
    // Hash Password
    reqbody.password = await encryptPass(reqbody.password);

    // save user in db
    const newUser = new UserModel(reqbody);
    await newUser
      .save()
      .then((doc) => {
        res
          .status(StatusCodes.CREATED)
          .send(resBodyBuilder("User created successfully", doc, false));
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(resBodyBuilder("Failed to create user", err.message, true));
      });
  } catch (err: any) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(resBodyBuilder("Internal server error", err, true));
  }
};

export const getUser = (req: Request, res: Response) => {};

export const editUser = (req: Request, res: Response) => {
  res.send("Edit User endpoint");
};

export default { createUser, getUser, editUser };
