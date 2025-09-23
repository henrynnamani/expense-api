import { DataSource } from 'typeorm';
import { config } from 'dotenv';

const env = process.env.NODE_ENV ?? 'development';

config({ path: `.env.${env}` });

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  synchronize: Boolean(process.env.DB_SYNC),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  ssl: true,
});
