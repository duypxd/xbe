import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CustomApiInternalServerErrorResponse,
  CustomApiUnauthorizedResponse,
} from 'src/utils';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: AuthDTO })
  @ApiResponse({
    status: 200,
    description: 'Success',
    isArray: true,
  })
  @CustomApiUnauthorizedResponse()
  @CustomApiInternalServerErrorResponse()
  @Post('register')
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
  }

  @ApiCreatedResponse({ type: AuthDTO })
  @ApiResponse({
    status: 200,
    description: 'Success',
    isArray: true,
  })
  @CustomApiUnauthorizedResponse()
  @CustomApiInternalServerErrorResponse()
  @Post('login')
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }
}
