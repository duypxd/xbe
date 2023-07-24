import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserEntity } from './api/user/entity/user.entity';
import { TaskEntity } from './api/task/entity/task.entity';
import { CommentEntity } from './api/comment/entity/comment.entity';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { TaskModule } from './api/task/task.module';
import { CommentModule } from './api/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'Abcde12345-',
      database: 'testDB',
      entities: [UserEntity, TaskEntity, CommentEntity],
      synchronize: true,
      // migrations: ['dist/src/db/migrations/*.ts'],
    }),
    TypeOrmModule.forFeature([UserEntity, TaskEntity, CommentEntity]),
    UserModule,
    AuthModule,
    TaskModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
