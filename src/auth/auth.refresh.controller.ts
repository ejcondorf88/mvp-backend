import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import type { User } from '../user.entity';

@Controller('auth')
export class AuthRefreshController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('refresh')
  async refresh(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    try {
      const user: User =
        await this.refreshTokenService.validateRefreshToken(refreshToken);

      const loginRes = await this.authService.login(user.email, null, true);

      return res.json({
        access_token: loginRes.access_token,
        role: user.role,
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
