import { UserAccessTokenClaims } from 'src/auth/dtos/auth-output.dto';

export class RequestContext {
  public requestID: string | undefined;

  public url: string;

  public ip: string | undefined;

  // TODO : Discuss with team if this import is acceptable or if we should move UserAccessTokenClaims to shared.
  public user: UserAccessTokenClaims;

  public range: string | undefined;
}
