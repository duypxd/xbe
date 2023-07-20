import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../../decorator';
import { JwtAuthGuard } from '../../guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CustomApiBadRequestResponse,
  CustomApiForbiddenResponse,
  CustomApiInternalServerErrorResponse,
  CustomApiNotFoundResponse,
  CustomApiResponse,
  CustomApiUnauthorizedResponse,
} from 'src/utils';
import { UserService } from './user.service';

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
  constructor(private userService: UserService) {}

  @Get('me')
  @CustomApiResponse()
  me(@GetUser() user: User) {
    return user;
  }

  @Get()
  @CustomApiResponse()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @CustomApiResponse()
  getUserById(@Param('id') userId: number) {
    return this.userService.getUserById(Number(userId));
  }
}
