import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { AuthRefreshController } from './auth.refresh.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Cambia esto en producción
      signOptions: { expiresIn: '15m' },
    }),
    RefreshTokenModule,
  ],
  providers: [AuthService, JwtStrategy, RefreshTokenService],
  controllers: [AuthController, AuthRefreshController],
})
export class AuthModule {}
