import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByIdOrThrow(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  toSafeUser(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      totalPoints: user.totalPoints,
      createdAt: user.createdAt
    };
  }
}
