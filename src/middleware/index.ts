import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import client from "../prisma/client.js";

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN!) as User;
    const user = await client.user.findFirst({ where: { email: decoded.email } });
    delete (user as Partial<User>).password;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    (req as any)["user"] = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Invalid token" });
  }
};

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (user!.role != "ADMIN") {
      return res.status(403).send({ message: "Your are not allowed" });
    }
    next();
  } catch (error) {
    return res.status(403).send({ message: "Your are not allowed" });
  }
};
