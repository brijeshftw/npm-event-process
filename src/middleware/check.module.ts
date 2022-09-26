import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppService } from 'src/app.service';
import { KafkaProvider } from '../kafka/kafka.provider';
import { KafkaService } from '../kafka/kafka.service';
import { MongoService } from '../Mongo/mongo.service';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';
import { MysqlService } from 'src/mysql/mysql.service';
import { CheckMiddleware } from './check.middleware';
@Module({
  imports: [],
  controllers: [CheckController],
  providers: [
    CheckService,
    KafkaProvider,
    MongoService,
    KafkaService,
    MysqlService,
    AppService,
  ],
})
export class MigrationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckMiddleware).forRoutes(CheckController);
  }
}
