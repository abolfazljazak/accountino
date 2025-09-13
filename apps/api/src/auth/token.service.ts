import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from './types/payload';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(payload: AccessTokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }
  async createRefreshToken(payload: AccessTokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }
}
