import { Dialect } from 'sequelize';

export const config = {
  database: {
    dialect: 'postgres' as Dialect,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'ineuron',
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
