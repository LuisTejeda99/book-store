import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AuroraDataApiConnectionCredentialsOptions } from 'typeorm/driver/aurora-data-api/AuroraDataApiConnectionCredentialsOptions';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
      return {
        ssl: false,
        type: 'mysql',
        host: configService.get(Configuration.HOST),
        port: 3306,
        username: configService.get(Configuration.USERNAME),
        password: configService.get(Configuration.PASSWORD),
        database: configService.get(Configuration.DATABASE),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: true,
      } as ConnectionOptions;
    },
  }),
];
