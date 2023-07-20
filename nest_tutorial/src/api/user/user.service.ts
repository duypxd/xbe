import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers() {
    try {
      return await this.prismaService.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createAt: true,
          updateAt: true,
        },
      });
    } catch (error) {
      throw new ForbiddenException('Cannot find Users!');
    }
  }

  async getUserById(userId: number) {
    try {
      const user: User = await this.prismaService.user.findFirst({
        where: {
          id: userId,
        },
      });
      delete user.hashedPassword;
      return user;
    } catch (_) {
      throw new ForbiddenException('Cannot find User!');
    }
  }
}
