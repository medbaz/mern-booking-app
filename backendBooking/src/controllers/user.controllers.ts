import { UsersModels } from "../models/user.model";
import express, { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UsersModels.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// DELETE A USER
const deleteUser = async (req: Request, res: Response) => {
  try {
    // console.log(id);

    await UsersModels.deleteMany({});
    return res.status(200).json({ message: "item deleted succussfully" });
  } catch (error) {
    return res.status(404).json({ message: "item not found" });
  }
};

export { getUsers, deleteUser };
