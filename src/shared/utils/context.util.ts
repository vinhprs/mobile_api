import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { UserAccessTokenClaims } from '../../auth/dtos/auth-output.dto';
import {
  FORWARDED_FOR_TOKEN_HEADER,
  REQUEST_ID_TOKEN_HEADER,
} from '../../common/constants';
import { RequestContext } from '../../shared/request-context/request-context.dto';

// Creates a RequestContext object from Request
export function createRequestContext(request: Request): RequestContext {
  const ctx = new RequestContext();
  ctx.requestID = request.header(REQUEST_ID_TOKEN_HEADER);
  ctx.url = request.url;
  ctx.ip = request.header(FORWARDED_FOR_TOKEN_HEADER)
    ? request.header(FORWARDED_FOR_TOKEN_HEADER)
    : request.ip;
  // const user = request.user ? request.user : request.header('user');
  // If request.user does not exist, we explicitly set it to null.
  ctx.user = plainToClass(UserAccessTokenClaims, request.user, {
    excludeExtraneousValues: false,
  });

  return ctx;
}
