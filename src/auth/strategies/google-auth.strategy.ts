import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { GOOGLE_AUTH } from '../constants/strategy.constant';
import { JwtPayload } from '../auth.interface';
import { UserAccessTokenClaims } from '../dtos/auth-output.dto';

@Injectable()
export class GoolgeStrategy extends PassportStrategy(Strategy, GOOGLE_AUTH) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_ID,
      callbackURL: 'http://localhost:4000/api/v1/auth/redirect',
      scope: ['email', 'profile'],
    });
  }

  validate(payload: JwtPayload): UserAccessTokenClaims {
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
