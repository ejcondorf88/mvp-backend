import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string | null, skipPassword = false) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user || (!skipPassword && !(await bcrypt.compare(password, user.password)))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = await this.refreshTokenService.createRefreshToken(user);
    return {
      access_token,
      refresh_token,
      role: user.role,
    };
  }
}
