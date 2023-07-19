import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtAuthGuard } from '../auth/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CustomApiBadRequestResponse,
  CustomApiForbiddenResponse,
  CustomApiInternalServerErrorResponse,
  CustomApiNotFoundResponse,
  CustomApiResponse,
  CustomApiUnauthorizedResponse,
} from 'src/utils';

@ApiTags('Users')
@ApiBearerAuth()
@CustomApiBadRequestResponse()
@CustomApiUnauthorizedResponse()
@CustomApiNotFoundResponse()
@CustomApiForbiddenResponse()
@CustomApiInternalServerErrorResponse()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  @Get('me')
  @CustomApiResponse()
  me(@GetUser() user: User) {
    return user;
  }
}
