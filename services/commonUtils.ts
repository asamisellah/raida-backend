import bcrypt from "bcrypt";

export const encryptPass = async (pass: String | any) => {
  if (!pass) return "";
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};
