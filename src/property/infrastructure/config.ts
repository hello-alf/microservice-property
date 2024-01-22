import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      dbName: process.env.MONGO_DB || 'propertyDB',
      user: process.env.MONGO_INITDB_ROOT_USERNAME || '',
      password: process.env.MONGO_INITDB_ROOT_PASSWORD || '',
      port: parseInt(process.env.MONGO_PORT, 10) || 27017,
      host: process.env.MONGO_HOST || 'localhost',
      connection: process.env.MONGO_CONNECTION || 'mongodb',
    },
  };
});
