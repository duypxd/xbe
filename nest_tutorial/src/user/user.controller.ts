import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { ApiTags } from '@nestjs/swagger';
import {
  CustomApiBadRequestResponse,
  CustomApiForbiddenResponse,
  CustomApiInternalServerErrorResponse,
  CustomApiNotFoundResponse,
  CustomApiResponse,
  CustomApiUnauthorizedResponse,
} from 'src/utils';

@ApiTags('Users')
@Controller('users')
export class UserController {
  @UseGuards(MyJwtGuard)
  @Get('me')
  @CustomApiResponse()
  @CustomApiBadRequestResponse()
  @CustomApiUnauthorizedResponse()
  @CustomApiNotFoundResponse()
  @CustomApiForbiddenResponse()
  @CustomApiInternalServerErrorResponse()
  me(@GetUser() user: User) {
    return user;
  }
}
