import { join } from 'path';
export const config = {
  db: {
    // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
  },
  graphql: {
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    cors: {
      credentials: true,
      origin: ['http://localhost:3000'],
    },
    installSubscriptionHandlers: true,
    autoTransformHttpErrors: true,
    debug: false,
  },
  hello: 'world',
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  grpcServerUrl: process.env.PORT_GRPC_URL,
};
