import express, { Router, Request, Response } from "express";
import UserService from "../services/userService.js";
import { adminMiddleware, jwtMiddleware } from "../middleware/index.js";

class UserController {
  userService: UserService;
  router: Router;

  constructor() {
    this.userService = new UserService();
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/me", jwtMiddleware, this.getUser);
    this.router.put("/:id/role", [jwtMiddleware, adminMiddleware], this.changeUserRole);
    this.router.post("/login", this.login);
    this.router.post("/register", this.register);
  }

  getUser = async (req: Request, res: Response) => {
    return res.send(req.user).status(200);
  };
  changeUserRole = async (req: Request, res: Response) => {
    const id = req.params.id;
    const role = req.body.role;

    if (!id) {
      return res.send({ status: "No user selected" });
    }

    if (!role) {
      return res.send({ status: "No role selected" }).status(422);
    }

    if (!["ADMIN", "USER"].includes(role)) {
      return res.send({ status: "Invalid role" }).status(422);
    }
    return res.send(await this.userService.updateUserRole(Number(id), role)).status(200);
  };

  login = async (req: Request, res: Response) => {
    const data = req.body;
    if (req.body.email && req.body.password) {
      const token = await this.userService.login(data);
      if (token) {
        return res.send({ token }).status(200);
      }
      return res.send().status(500);
    }
    return res.send({ status: "login orr password incorrect" }).status(422);
  };

  register = async (req: Request, res: Response) => {
    const data = req.body;
    if (req.body.email && req.body.password && req.body.username) {
      return res.send(await this.userService.register(data)).status(201);
    }
    return res.send({ status: "provide valid data" }).status(422);
  };

  getRouter() {
    return this.router;
  }
}

export default UserController;
