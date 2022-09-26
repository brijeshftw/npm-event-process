import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkaProvider {
  constructor(private kafkaService: KafkaService) {}
  kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT,
    brokers: process.env.KAFKA_BROKERS.split(','),
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_SASL_USERNAME,
      password: process.env.KAFKA_SASL_PASSWORD,
    },
    retry: {
      initialRetryTime: 100,
      retries: 10,
    },
    requestTimeout: 120000,
  });
  producer = this.kafka.producer();
  consumer = this.kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

  async saveProducer(data: any): Promise<any> {
    data.data.nodeProduceTime = new Date().toISOString();
    const mainData = [{ value: JSON.stringify(data) }];
    await this.producer.connect();
    await this.producer.send({
      topic: process.env.KAFKA_TOPIC_LEGACY_EVENT_INPUT,
      messages: mainData,
    });
  }
  async getConsumer(): Promise<any> {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: process.env.KAFKA_TOPIC_DRIVER_EVENT_OUTPUT,
      fromBeginning: false,
    });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const mainData = JSON.parse(message.value.toString());

        await this.kafkaService.consumerToglobal(mainData);
      },
    });
  }
}
