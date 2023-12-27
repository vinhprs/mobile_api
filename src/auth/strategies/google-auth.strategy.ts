import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { GOOGLE_AUTH } from "../constants/strategy.constant";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../auth.interface";
import { UserAccessTokenClaims } from "../dtos/auth-output.dto";

@Injectable()
export class GoolgeStrategy extends PassportStrategy(
    Strategy,
    GOOGLE_AUTH
) {
    constructor(config: ConfigService) {
        super({
            clientID: config.get('google_client_id'),
            clientSecret: config.get('google_client_secret'),
            callbackURL: 'https://staging.primeedu.io.vn',
            scope: ['email', 'profile']
        })
    }

    validate(payload: JwtPayload): UserAccessTokenClaims {
        return {
            id: payload.sub,
            email: payload.email,
            roles: payload.roles
        }
    }
}