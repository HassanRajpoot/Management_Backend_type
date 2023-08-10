import jwt from "jsonwebtoken";
import express from 'express'
import { User } from "../db/user"; // Assuming you have the correct import path
import { SECRET_KEY } from "../index";

declare module 'express' {
  interface Request {
    user?: any;
  }
}

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { _id: string };
    const user = await User.findById(decoded._id); // Renamed 'res' to 'user'
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
