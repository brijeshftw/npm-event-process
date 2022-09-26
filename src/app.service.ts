import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: 'Hello Legacy Driver Event Service' };
  }
}
