import { Module } from '@nestjs/common';

import { CommonService } from '../common.service';
import { KafkaService } from '../kafka/kafka.service';
import { MysqlService } from './mysql.service';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MysqlService, KafkaService, CommonService, UtilsService],
})
export class MysqlModule {}
