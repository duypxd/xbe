import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDTO } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(authDTO: AuthDTO) {
    const hashedPassword = await argon.hash(authDTO.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword,
        },
        select: {
          id: true,
          email: true,
          createAt: true,
        },
      });
      return {
        ...user,
        accessToken: await this.signJwtToken(user.id, user.email),
      };
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ForbiddenException(error.message);
      }
    }
  }

  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });
    // Compare password
    // const passwordMatched = await argon.verify(
    //   user.hashedPassword,
    //   authDTO.password,
    // );
    // if (!user) {
    //   throw new ForbiddenException('User not found!');
    // }
    // if (!passwordMatched) {
    //   throw new ForbiddenException('Incorrect password');
    // }
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
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return jwtString;
  }
}
