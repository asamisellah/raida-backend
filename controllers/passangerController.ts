import { Request, Response } from "express";
import { passangers } from "../models/data";
import { encryptPass } from "../services/commonUtils";
import { User, ResponseType, Status } from "../types";


export const createUser = (req: Request, res: Response<ResponseType>) => {
  const reqbody: User = req.body;
    // Hash Password
    reqbody.password = await encryptPass(reqbody.password);

    // save driver in db
    const newDriver = new DriverModel(reqbody);
    await newDriver
      .save()
      .then((doc) => {
        res.status(201).json({
          status: Status.SUCCESS,
          message: "Driver created successfully",
          data: doc,
        });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({
          status: Status.FAILURE,
          message: "Failed to create driver",
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

export const getUser = (req: Request, res: Response) => {
  const user = passangers.filter((user) => user.id === req.params.userId);
  console.log(passangers);
  res.status(200).send(user);
};

export const editUser = (req: Request, res: Response) => {
  res.send("Edit User endpoint");
};

export default { createUser, getUser, editUser };
