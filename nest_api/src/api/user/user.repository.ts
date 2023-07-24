import { ForbiddenException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './entity/user.entity';
import { Pagination, PaginationDto } from '../../common/dto/pagination.dto';

@EntityRepository()
export class UserRepository extends Repository<UserEntity> {
  async getUsers(paginationDTO: PaginationDto) {
    try {
      const data = await this.find({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createAt: true,
          updatedAt: true,
        },
        ...Pagination.query(paginationDTO.page, paginationDTO.perPage),
      });
      const total = await this.count();
      return {
        data,
        total,
        ...paginationDTO,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getUserById(userId: number): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.findOne({
        where: {
          id: userId,
        },
      });
      delete user.hashedPassword;
      return user;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
