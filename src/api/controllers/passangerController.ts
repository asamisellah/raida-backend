import { Request, Response } from "express";
import { UserModel } from "../models/passangerModel";
import { encryptPass } from "../utils/commonUtils";
import { User, ResponseType, Status } from "../../types/interfaces";

export const createUser = async (req: Request, res: Response) => {
  try {
    const reqbody: User = req.body;
    console.log("Inside user", reqbody);
    // Hash Password
    reqbody.password = await encryptPass(reqbody.password);

    // save user in db
    const newUser = new UserModel(reqbody);
    await newUser
      .save()
      .then((doc) => {
        res.status(201).json({
          status: Status.SUCCESS,
          message: "User created successfully",
          data: doc,
        });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({
          status: Status.FAILURE,
          message: "Failed to create user",
          errors: err.message,
        });
      });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      status: Status.FAILURE,
      message: "Internal server error",
      errors: err,
    });
  }
};

export const getUser = (req: Request, res: Response) => {};

export const editUser = (req: Request, res: Response) => {
  res.send("Edit User endpoint");
};

export default { createUser, getUser, editUser };
