import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ msg: `user with id ${id} doesn't exist` });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const emailExist = await User.findOne({ where: { email: body.email } });
    if (emailExist) {
      return res.status(400).json({ msg: `email already registered` });
    }
    const user = User.build(body);
    await user.save();
    res.json({ user });
  } catch (error) {
    console.log(error as string);
    res.status(500).json({ msg: `talk with admin` });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(400).json({ msg: `user doesn't exist` });
  }
  await user.update(body);
  res.json({ user });

  res.json({ msg: "putUser", body, id });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ msg: `user with id ${id} doesn't exist` });
  }

  await user.update({ state: false });
  res.json({ user });
};
