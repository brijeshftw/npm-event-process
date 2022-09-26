import { Injectable } from '@nestjs/common';

@Injectable()
export class MysqlService {
  async saveInMysql(newData: any): Promise<any> {
    const { data, type } = newData;
    console.log(data, type);
  }
}
