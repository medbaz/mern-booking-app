import { UsersModels } from "../models/user.model";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
const validator = require("validator");
import "dotenv/config";
import bcrypt from "bcryptjs";

// SIGN UP A USER
const addUser = async (req: Request, res: Response) => {
  const { email, password, firstname, lastname } = req.body;
  const findUser = await UsersModels.findOne({ email });
  if (findUser) {
    return res.status(400).json({ message: "user exicte alrealy" });
  }

  // VALIDATE DATA
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({ message: "all fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "please enter a valide email" });
  }

  const options = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  };
  if (!validator.isStrongPassword(password, options)) {
    return res.status(400).json({ message: "please enter a valide password" });
  }

  try {
    // create user and encrypt pass
    const user = new UsersModels(req.body);
    await user.save();

    // create a jwt
    const token = jwt.sign(
      { user_id: user.id },
      process.env.ENCYPT_TOKEN_KEY as string,
      { expiresIn: "1d" }
    );

    // save the token in the client side
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    res.status(200).json({ message: "user added succussfully" });
  } catch (error) {
    res.status(404).json({ message: "unable to add user" });
  }
};

// LOGIN A USER
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UsersModels.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalide Credenials" });
  }

  // VALIDATE DATA
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalide Credenials" });
  }

  try {
    const token = jwt.sign(
      { user_id: user.id },
      process.env.ENCYPT_TOKEN_KEY as string,
      { expiresIn: "1d" }
    );

    // save the token in the client side
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    res.status(200).json({ message: "logged in succussfully" });
  } catch (error) {
    res.status(404).json({ message: "unable to login" });
  }
};

const logout = async (req: Request, res: Response) => {
  console.log("logout end point");

  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "Log out successfully" });
};

export { addUser, login, logout };
