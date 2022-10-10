import { Injectable } from '@nestjs/common';
// import { KafkaProvider } from 'src/kafka/kafka.provider';
import { KafkaProvider } from '@sample_npm/sample-package';
import { Subject } from 'rxjs';

@Injectable()
export class MigrationService {

  constructor() { }


  // kafka = new KafkaProvider({clientId:'legacy-event-process-client-10',brokers:['172.21.0.11:9093','172.21.0.13:9093','172.21.0.14:9093'],topic:'driver-event-input',groupId:'legacy-event-process-10', retry: {
  //   initialRetryTime: 100,
  //   retries: 10,
  // },
  // requestTimeout: 120000,username:process.env.KAFKA_SASL_USERNAME,password:process.env.KAFKA_SASL_PASSWORD})


  async sendProducer(body: any): Promise<any> {
    let kafka = new KafkaProvider({
      clientId: 'legacy-event-process-client-10', brokers: ['172.21.0.11:9093', '172.21.0.13:9093', '172.21.0.14:9093'], topic: 'driver-event-input', groupId: 'legacy-event-process-10', retry: {
        initialRetryTime: 100,
        retries: 10,
      },
      requestTimeout: 120000, username: process.env.KAFKA_SASL_USERNAME, password: process.env.KAFKA_SASL_PASSWORD
    })

    const { data, type } = body;

    kafka.createKafkaInstance()
    let prod = await kafka.saveProducer(body);
    console.log("test", prod);
    let consumer = await kafka.getConsumer();
    console.log("tes", consumer)


  }
}
