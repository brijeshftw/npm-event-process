import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppService } from 'src/app.service';
import { CommonService } from '../common.service';
// import { KafkaProvider } from '../kafka/kafka.provider';
import { KafkaService } from '../kafka/kafka.service';
import { MongoService } from '../Mongo/mongo.service';
import { MysqlService } from '../TypeOrm/mysql.service';
import { UtilsService } from '../TypeOrm/utils/utils.service';
import { MigrationController } from './migration.controller';
import { MIgrationMiddleware } from './migration.middleware';
import { MigrationService } from './migration.service';

@Module({
  imports: [],
  controllers: [MigrationController],
  providers: [
    MigrationService,
    // KafkaProvider,
    MongoService,
    KafkaService,
    CommonService,
    MysqlService,
    UtilsService,
    AppService,
  ],
})
export class MigrationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MIgrationMiddleware).forRoutes(MigrationController);
  }
}
