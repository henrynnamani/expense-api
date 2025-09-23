import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environmentValidator } from './database/environment-validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database/datasource';
import { JwtModule } from '@nestjs/jwt';

const env = process.env.NODE_ENV || 'production';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        exp: config.get<string>('JWT_ACCESS_EXPIRY'),
        global: true,
      }),
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: env ? `.env.${env}` : '.env',
      load: [() => process.env],
      validate: (config) => {
        const result = environmentValidator.safeParse(config);

        if (result.error) {
          throw new Error('Invalid environment variable');
        }

        return result.data;
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
      }),
      dataSourceFactory: async () => {
        if (!dataSource.initialize) {
          return dataSource.initialize();
        }

        return dataSource;
      },
    }),
    AuthModule,
    UserModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
