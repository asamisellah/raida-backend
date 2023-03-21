import bcrypt from "bcrypt";
import { Status } from "../../types/interfaces";

export const encryptPass = async (pass: String | any) => {
  if (!pass) return "";
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

export const resPayloadBuilder = (message: string, data: any, err: boolean) => {
  return err ? { message, errors: err } : { message, data };
};
