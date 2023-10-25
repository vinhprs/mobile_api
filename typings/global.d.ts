import { Payload } from '../src/auth';

export declare global {
  type AnyObject = Record<string, unknown>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      PORT_GRPC_URL: string;
      PORT_GRPC_PORT: string;
      DB_TYPE: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_SCHEMA: string;
      DB_HOST_SLAVE: string;
      DB_PORT_SLAVE: string;
      DB_USER_SLAVE: string;
      DB_PASSWORD_SLAVE: string;
      DB_NAME_SLAVE: string;
      DB_SCHEMA_SLAVE: string;
      EMAIL_FROM: string;
      EMAIL_ACCOUNT: string;
      EMAIL_PASSWORD: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_PUBLIC: string;
      VERIFICATION_DOMAIN: string;
      VN_PROVINCE_DOMAIN: string;
      AWS_BUCKET_NAME: string;
    }
  }

  namespace Express {
    interface Request {
      id: string;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends Payload {}
  }
}
