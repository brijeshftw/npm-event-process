import { Injectable } from '@nestjs/common';
import { MysqlService } from '../mysql/mysql.service';

@Injectable()
export class KafkaService {
  constructor(private mysqlService: MysqlService) {}

  async consumerToglobal(newData: any): Promise<any> {
    try {
      if (newData.type.startsWith('save-')) {
        await this.mysqlService.saveInMysql(newData);
      }
    } catch (ex) {
      console.log('Error while sending on gpe', ex);
    }
  }
}
