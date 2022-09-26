import { Module } from '@nestjs/common';

import { KafkaService } from '../kafka/kafka.service';
import { MysqlService } from './mysql.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MysqlService, KafkaService],
})
export class MysqlModule {}
