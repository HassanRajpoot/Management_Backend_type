import jwt from "jsonwebtoken";
import { User } from "db/user";
import { SECRET_KEY } from "../index";
import express, {Request, Response} from 'express';
export const sendCookie = (
  user: any,
  res: Response,
  message: string,
  statusCode:number = 200
) => {
  const token = jwt.sign({ _id: user._id }, SECRET_KEY);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
