import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Pagination, PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(params: PaginationDto) {
    try {
      const data = await this.prismaService.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createAt: true,
          updateAt: true,
        },
        ...Pagination.query(params.page, params.perPage),
      });
      const total = await this.prismaService.user.count();
      return {
        data,
        total,
        ...params,
      };
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
