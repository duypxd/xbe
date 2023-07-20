import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../../decorator';
import { JwtAuthGuard } from '../../guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CustomApiBadRequestResponse,
  CustomApiForbiddenResponse,
  CustomApiInternalServerErrorResponse,
  CustomApiNotFoundResponse,
  CustomApiResponse,
  CustomApiUnauthorizedResponse,
} from 'src/utils';
import { UserService } from './user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  getUsers(@Query() params: PaginationDto) {
    const page = Number(params.page ?? 1);
    const perPage = Number(params.perPage ?? 10);
    return this.userService.getUsers({ page, perPage });
  }

  @Get(':id')
  @CustomApiResponse()
  getUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getUserById(Number(userId));
  }
}
