import { Injectable } from '@nestjs/common';
import * as axion from 'axios';


@Injectable()
export class CommonService {
  async sendData(url: string, data: any): Promise<any> {

    const value = await axion.default.post(url, data);
 
    return value.data;
  }

}

