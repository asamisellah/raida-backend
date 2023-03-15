import { passangers } from "../dto/data.js";

export const createUser = (req, res) => {
  console.log(req);
  let newUser = req.body;

  passangers.push({ id: passangers.length, ...newUser });
  // console.log(passangers)
  res.status(200).send(passangers);
}

export const getUser = (req, res) => {
  const user = passangers.filter(user => user.id = req.params.userId);
  res.status(200).send(user);
}

export const editUser = (req, res) => {
  res.send("Edit User endpoint")
}

export default { createUser, getUser, editUser };