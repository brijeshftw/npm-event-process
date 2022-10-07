import { Module } from '@nestjs/common';
import { CommonService } from '../common.service';
import { MongoService } from '..//Mongo/mongo.service';
import { MysqlService } from '../TypeOrm/mysql.service';
import { UtilsService } from '../TypeOrm/utils/utils.service';
// import { KafkaProvider } from './kafka.provider';
import { KafkaService } from './kafka.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    // KafkaProvider,
    KafkaService,
    MongoService,
    CommonService,
    MysqlService,
    UtilsService,
  ],
})
export class KafkaModule {
  constructor(
    // private kafka: KafkaProvider,
    private kafkaService: KafkaService,
  ) {}
  // run = this.kafka.getConsumer();
}
