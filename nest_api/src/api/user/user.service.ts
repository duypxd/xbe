import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { Pagination, PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private _userRepository: UserRepository,
  ) {}

  async getUsers(paginationDTO: PaginationDto) {
    try {
      const data = await this._userRepository.find({
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
      const total = await this._userRepository.count();
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
      const user: UserEntity = await this._userRepository.findOne({
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
