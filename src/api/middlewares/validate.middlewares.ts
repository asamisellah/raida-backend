import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { resBodyBuilder } from "../utils/commonUtils";

function validate(schema: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await schema.validate(req.body, { abortEarly: true });

      next();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST);
      return res.send(resBodyBuilder("Validation error", error, true));
    }
  };
}
export default validate;
