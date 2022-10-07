import { Injectable } from '@nestjs/common';
// import {myprint} from '@sample_npm/sample-print';
@Injectable()
export class AppService {
  getHello(): any {
    // myprint("sasasa______________+++++++++++++++++++++++SSS")
    
    return {message:'Hello Legacy Driver Event Service'};
  }
}

