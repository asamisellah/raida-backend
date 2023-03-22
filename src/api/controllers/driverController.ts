import { Request, Response } from "express";
import { DriverModel } from "../models/driverModel";
import { encryptPass, resBodyBuilder } from "../utils/commonUtils";
import { ResponseType, Status } from "../../types/interfaces";
import driverService from "../services/driverService";
import { DriverModelType } from "../../types/types";
import { StatusCodes } from "http-status-codes";

export const createDriver = async (req: Request, res: Response) => {
  const { password } = req.body;
  // Hash Password
  const encPass = await encryptPass(password);
  req.body.password = encPass;

  // save driver in db
  driverService
    .saveDriver(req.body)
    .then((doc) =>
      res
        .status(StatusCodes.CREATED)
        .send(resBodyBuilder("Driver created successfully", doc, false))
    )
    .catch((err: Error) =>
      res
        .status(StatusCodes.CREATED)
        .send(resBodyBuilder("Could not create driver", err.message, true))
    );
};

export const getDriver = async (req: Request, res: Response) => {
  const driverId = req.params.driverId;

  const driver = await driverService.getDriver(driverId);

  if (!driver)
    return res
      .status(404)
      .send(resBodyBuilder("Driver not found", {}, true));

  return res
    .status(200)
    .send(resBodyBuilder("Retrieved Driver", driver, false));
};

export const editDriver = (req: Request, res: Response) => {
  res.send("Edit driver details");
};

export const setDriverStatus = async (req: Request, res: Response) => {
  /** Status in payload and map to an emum
      Depending on status being set:
      If available/standby, switch on GPS streaming and add to drivers queue
      If in ride, GPS streaming is still on and remove from queue
      If unavailable, switch off GPS streaming and remove from drivers queue
  */
  const driverId = req.params.driverId;

  const updatedStatus = await driverService
    .updateAvailability(req.body, driverId)
    .then((doc) => {
      return res
        .status(StatusCodes.OK)
        .send(resBodyBuilder("Status updated", doc, false));
    })
    .catch((err: Error) => {
      resBodyBuilder("Could not update status", err.message, true);
    });
};

export default { createDriver, getDriver, editDriver, setDriverStatus };
