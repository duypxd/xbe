import { Injectable } from '@nestjs/common';

import { UserEntity } from './entity/user.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async getUsers(paginationDTO: PaginationDto) {
    return this.userRepository.getUsers(paginationDTO);
  }

  async getUserById(userId: number): Promise<UserEntity> {
    return this.userRepository.getUserById(userId);
  }
}
