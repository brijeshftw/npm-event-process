import { Module } from '@nestjs/common';

import { KafkaProvider } from './kafka.provider';
import { KafkaService } from './kafka.service';

@Module({
  imports: [],
  controllers: [],
  providers: [KafkaProvider, KafkaService],
})
export class KafkaModule {
  constructor(
    private kafka: KafkaProvider,
    private kafkaService: KafkaService,
  ) {}
  run = this.kafka.getConsumer();
}
