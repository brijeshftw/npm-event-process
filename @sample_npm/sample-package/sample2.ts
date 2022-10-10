import { Consumer, Kafka, Producer } from 'kafkajs';



export class KafkaProvider {
 public clientId: string;
  private brokers = []; 
  private ssl:object;
  private retry: object;
  private requestTimeout: number;
  private kafka:any;
  private consumer:Consumer;
  private producer:Producer;
  private topic:string;
  private fromBeginning:boolean;
  private groupId:string;
  private username:string;
  private password:any;
  
  constructor(private kafkaConfig:any) {
    this.clientId = kafkaConfig.clientId;
    this.brokers = kafkaConfig.brokers;
    this.ssl = kafkaConfig.ssl;
    this.retry = kafkaConfig.retry;
    this.requestTimeout = kafkaConfig.requestTimeout;
    this.kafka = kafkaConfig.kafka;
    this.consumer = kafkaConfig.consumer;
    this.producer = kafkaConfig.producer;
    this.topic = kafkaConfig.topic;
    this.fromBeginning = kafkaConfig.fromBeginning;
    this.groupId = kafkaConfig.groupId;
    this.username = kafkaConfig.username;
    this.password = kafkaConfig.password;    
}

  public createKafkaInstance(){
    this.kafka = new Kafka({
        clientId: this.clientId,
        brokers:this.brokers,
        sasl: {
          mechanism: 'scram-sha-256',
          username: this.username,
          password: this.password,
        },
        retry: {
          initialRetryTime: 100,
          retries: 10,
        },
        requestTimeout: 120000,
      });
    
      this.producer = this.kafka.producer();
      this.consumer = this.kafka.consumer({ groupId:this.groupId });
    
  }
 
  async saveProducer(data: any): Promise<any> {
    data.data.nodeProduceTime = new Date().toISOString();
    const mainData = [{ value: JSON.stringify(data) }];
    await this.producer.connect();
    return await this.producer.send({
      topic: this.topic,
      messages: mainData,
    });
  }

  async getConsumer(): Promise<any> {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: this.topic,
      fromBeginning: false,
    });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const mainData = JSON.parse(message.value.toString());

            // await this.kafkaService.consumerToglobal(mainData);  
           
      },    
    });
  }
}
