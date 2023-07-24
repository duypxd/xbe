import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(authDTO: AuthDTO) {
    const hashedPassword = await argon.hash(authDTO.password);
    try {
      const user = await this.authRepository.save({
        email: authDTO.email,
        hashedPassword,
      });
      delete user.hashedPassword;
      return {
        user,
        accessToken: await this.signJwtToken(user.id, user.email),
      };
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ForbiddenException(error.message);
      }
      throw new ForbiddenException(error.message);
    }
  }

  async login(authDTO: AuthDTO) {
    console.log('login', authDTO);
    const user = await this.authRepository.findOne({
      where: {
        email: authDTO.email,
      },
    });
    // Compare password
    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );
    if (!user) {
      throw new ForbiddenException('User does not exist!');
    }
    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password');
    }
    try {
      delete user.hashedPassword;
      return {
        ...user,
        accessToken: await this.signJwtToken(user.id, user.email),
      };
    } catch (_) {
      throw new ForbiddenException('Email or password incorrect!');
    }
  }

  async signJwtToken(userId: number, email: string): Promise<string> {
    const payload = {
      userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '1440m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return jwtString;
  }
}
