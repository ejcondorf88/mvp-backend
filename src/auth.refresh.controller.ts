import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';
import { User } from './user.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthRefreshController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string, @Res() res: Response) {
    try {
      const user: User = await this.refreshTokenService.validateRefreshToken(refreshToken);
      const loginRes = await this.authService.login(user.email, null, true); // true: login sin password
      return res.json({ access_token: loginRes.access_token, role: user.role });
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
