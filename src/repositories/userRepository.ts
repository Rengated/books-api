import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../prisma/client.js";

class UserRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prismaClient;
  }

  async getUser(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(userData: Omit<User, "id" | "role">) {
    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        username: userData.username,
      },
    });
    delete (user as Partial<User>).password;
    return user;
  }

  async updateUser(userId: number, fields: Partial<Omit<User, "id">>) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { ...fields },
    });

    delete (updatedUser as Partial<User>).password;
    return updatedUser;
  }

  async deleteUser(userId: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: userId },
    });
    delete (deletedUser as Partial<User>).password;
    return deletedUser;
  }
}

export default UserRepository;
