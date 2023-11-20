export const config = {
  db: {
    // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
  },
  hello: 'world',
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  saltRounds: 7,
  vnProvinceDomain: process.env.VN_PROVINCE_DOMAIN,
  jwt: {
    publicKey: Buffer.from(process.env.JWT_PUBLIC, 'base64').toString('utf-8'),
    privateKey: Buffer.from(process.env.JWT_SECRET, 'base64').toString('utf-8'),
    expiresIn: '15m',
    refreshExpiresIn: '7d',
  },
  aws_bucket_name: process.env.AWS_BUCKET_NAME,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secrect_key: process.env.AWS_SECRECT_KEY,
  aws_region: process.env.AWS_REGION,
  grpcServerUrl: process.env.PORT_GRPC_URL,
  vnp_tmncode: process.env.VNP_TMNCODE,
  vnp_command: process.env.VNP_COMMAND,
  vnp_locale: process.env.VNP_LOCALE,
  vnp_version: process.env.VNP_VERSION,
  vnp_hash_secrect: process.env.VNP_HASH_SECRECT,
  vnp_url: process.env.VNP_URL,
  vnp_return_url: process.env.VNP_RETURN_URL,
};
