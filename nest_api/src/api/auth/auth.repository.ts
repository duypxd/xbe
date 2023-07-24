import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';

@EntityRepository()
export class AuthRepository extends Repository<UserEntity> {}
