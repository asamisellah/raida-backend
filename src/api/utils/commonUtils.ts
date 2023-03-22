import bcrypt from "bcrypt";

export const encryptPass = async (pass: String | any) => {
  if (!pass) return "";
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

export const resBodyBuilder = (message: string, data: any, err: boolean) => {
  return err ? { message, errors: data } : { message, data };
};
