import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { CommonService } from './common.service';
import { KafkaModule } from './kafka/kafka.module';
import { MigrationModule } from './Migration/migration.module';
import { MongoModule } from './Mongo/mongo.module';
import { connectToMongoDatabase } from './config/mongo.provider';

import { MysqlModule } from './TypeOrm/mysql.module';
import { MysqlService } from './TypeOrm/mysql.service';
import { KnexModule } from 'nestjs-knex';
import { UtilsService } from './TypeOrm/utils/utils.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.local.env',
      isGlobal: true,
    }),

    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'mysql',
          useNullAsDefault: true,
          connection: {
            host: process.env.MYSQL_DB_HOSTNAME,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DB_NAME,
            ssl: true,
          },
        },
      }),
    }),

    MongoModule,
    KafkaModule,
    MysqlModule,
    MigrationModule,
    HttpModule,
  ],
  controllers: [],
  providers: [
    CommonService,
    MysqlService,
    AppService,
    UtilsService,
    AppService,
  ],
})
export class AppModule {
  constructor() {
    connectToMongoDatabase()
      .then(() => {
        console.log('MongoDB Connected');
      })
      .catch((ex) => {
        console.log('Error While Connecting MongoDB\n', ex);
      });
  }
}
