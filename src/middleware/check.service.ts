import { Injectable } from '@nestjs/common';
import { KafkaProvider } from 'src/kafka/kafka.provider';

@Injectable()
export class CheckService {
  constructor(private kafkaProducer: KafkaProvider) {}
  async sendProducer(body: any): Promise<any> {
    const { data, type } = body;
    await this.kafkaProducer.saveProducer({ data, type });
  }
}
