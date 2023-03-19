import { Request, Response } from "express";
import { DriverModel } from "../models/model";
import { encryptPass } from "../services/commonUtils";
import { DriverRequest, ResponseType, Status } from "../../types/interfaces";

export const createDriver = async (
  req: Request,
  res: Response<ResponseType>
) => {
  try {
    const reqbody: DriverRequest = req.body;
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

export const getDriver = async (req: Request, res: Response<ResponseType>) => {
  try {
    const driverId = req.params.driverId;

    // retrieve driver from db
    const driver = await DriverModel.findById(driverId, "-password").lean();

    if (!driver)
      return res
        .status(404)
        .json({ status: Status.FAILURE, message: "Driver not found" });

    res.status(200).json({
      status: Status.SUCCESS,
      message: "Retrieved Driver",
      data: driver,
    });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({
      status: Status.FAILURE,
      message: "Failure retrieving driver",
      errors: err.message ? err.message : err,
    });
  }
};

export const editDriver = (req: Request, res: Response) => {
  res.send("Edit driver details");
};

export const setDriverStatus = async (req: Request, res: Response) => {
  // status in payload and map to an emum
  // Depending on status being set:
  // If available/standby, switch on GPS streaming and add to drivers queue
  // If in ride, GPS streaming is still on and remove from queue
  // If unavailable, switch off GPS streaming and remove from drivers queue
  const status = req.body;
  console.log(status);

  const updatedStatus = await DriverModel.findByIdAndUpdate(
    req.params.driverId,
    status,
    { new: true }
  ).lean();

  console.log("Status::: ", updatedStatus);
  res.send("Set driver status");
};



export default { createDriver, getDriver, editDriver, setDriverStatus };
