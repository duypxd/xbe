import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { CommentModule } from './api/comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    CommentModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
