import { Injectable } from '@nestjs/common';
import { MysqlService } from '../TypeOrm/mysql.service';
// import {myprint} from '@sample_npm/sample-print';
import { KafkaProvider } from "@sample_npm/sample-print";
import { SimpleConsoleLogger } from 'typeorm';

@Injectable()
export class KafkaService {
  constructor(private mysqlService: MysqlService) {

  }

  // kafka = new KafkaProvider({clientId:'legacy-event-process-client-10',brokers:['172.21.0.11:9093','172.21.0.13:9093','172.21.0.14:9093'],topic:'driver-event-output',groupId:'legacy-event-process-10', retry: {
  //   initialRetryTime: 100,
  //   retries: 10,
  // },
  // requestTimeout: 120000,username:process.env.KAFKA_SASL_USERNAME,password:process.env.KAFKA_SASL_PASSWORD})

  async consumerToglobal(newData: any): Promise<any> {
 console.log("consumerToglobal",newData);
    try {
      if (newData.type.startsWith('save-')) {
        // this.kafka.createKafkaInstance()
        await this.mysqlService.saveInMysql(newData);
        // myprint("sadasdadasdadada");
       

// console.log("ssssss",kafka)
// let data = await this.kafka.saveProducer(newData)
// console.log("ssssss++++++",data)

        console.log("count",newData.type);
        console.count("login");
       // console.log("length",newData + counter + "times");
       // console.count("abc");
      }
    } catch (ex) {
      console.log('Error while sending on gpe', ex);
    }
  }
}
