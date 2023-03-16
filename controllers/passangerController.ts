import { Request, Response } from "express";
import { passangers } from "../dto/data";

export const createUser = (req: Request, res: Response) => {
  let newUser = req.body;

  passangers.push({ id: passangers.length, ...newUser });
  // console.log(passangers)
  res.status(200).send(passangers);
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
