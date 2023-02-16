import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import pg from 'pg';
import { models } from '../models';

@Module({})
export class DatabaseModule {
  static forFeature(providers: Provider<unknown>[] = []): DynamicModule {
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return {
              dialect: 'postgres',
              host: configService.get('DATABASE_HOST') || 'localhost',
              port: +configService.get('DATABASE_PORT') || 5432,
              username: configService.get('DATABASE_USERNAME') || 'postgres',
              password: configService.get('DATABASE_PASSWORD') || 'postgres',
              database: configService.get('DATABASE_NAME') || 'ineuron',
              dialectModule: pg,
              models: models,
              logging: console.log,
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
