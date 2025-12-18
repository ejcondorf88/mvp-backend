import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy as JwtStrategyBase } from 'passport-jwt';

type JwtPayload = {
  sub: number;
  email: string;
  role: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // Cambia esto en producción
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
