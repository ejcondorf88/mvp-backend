import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { User } from '../user.entity';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async createRefreshToken(user: User): Promise<string> {
    const token = crypto.randomBytes(64).toString('hex');
    const expires = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días
    );

    await this.refreshTokenRepo.save({
      token,
      user,
      expires,
    });

    return token;
  }

  async validateRefreshToken(token: string): Promise<User> {
    const record = await this.refreshTokenRepo.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!record || record.expires < new Date()) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    return record.user;
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepo.delete({ token });
  }
}
