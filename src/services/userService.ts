import { Role, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/userRepository.js";
import "dotenv/config.js";

class UserService {
  userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: Omit<User, "id" | "role">) {
    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;
    return await this.userRepository.createUser(userData);
  }

  async login(userData: Omit<User, "id" | "role">) {
    let token;
    const user = await this.userRepository.getUser(userData.email);
    const isMatch = await bcrypt.compare(userData.password, user!.password);
    if (isMatch) {
      token = jwt.sign(user!, process.env.JWT_TOKEN!, { expiresIn: "30d" });
    }
    return token;
  }

  async updateUserRole(userId: number, role: Role) {
    return await this.userRepository.updateUser(userId, { role });
  }

  async getUser(email: string) {
    return await this.userRepository.getUser(email);
  }
}

export default UserService;
