import { Request, Response } from "express";
import { DriverModel } from "../models";
import { DriverRequest, ResponseType, Status } from "../types";

export const createDriver = (req: Request, res: Response<ResponseType>) => {
  const request: DriverRequest = req.body;
  console.log(request);

  let driver = new DriverModel(request);
  driver
    .save()
    .then((doc) => {
      res.status(201).send({
        status: Status.SUCCESS,
        message: "Driver created successfully",
        data: doc,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send({
        status: Status.FAILURE,
        message: "Failed to create driver",
        errors: err.message,
      });
    });
};

export const getDriver = (req: Request, res: Response) => {
  res.send("Get Driver");
};

export const editDriver = (req: Request, res: Response) => {
  res.send("Edit driver details");
};

export const setDriverStatus = (req: Request, res: Response) => {
  // status in payload and map to an emum
  // Depending on status being set:
  // If available/standby, switch on GPS streaming and add to drivers queue
  // If in ride, GPS streaming is still on and remove from queue
  // If unavailable, switch off GPS streaming and remove from drivers queue
  res.send("Set driver status");
};

export default { createDriver, getDriver, editDriver, setDriverStatus };
