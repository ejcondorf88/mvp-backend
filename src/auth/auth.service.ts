import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      void password;
      return result;
    }

    return null;
  }
  async login(email: string, password: string | null, skipPassword = false) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (
      !user ||
      (!skipPassword && !(await bcrypt.compare(password ?? '', user.password)))
    ) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload);
    const refresh_token =
      await this.refreshTokenService.createRefreshToken(user);

    return {
      access_token,
      refresh_token,
      role: user.role,
    };
  }
}
