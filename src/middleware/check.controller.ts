import {
  Body,
  Controller,
  Post,
  HttpCode,
  Get,
  HttpStatus,
} from '@nestjs/common';

import { CheckService } from './check.service';
import { AppService } from 'src/app.service';

@Controller()
export class CheckController {
  constructor(
    private checkService: CheckService,
    private readonly appService: AppService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/Producer')
  @HttpCode(HttpStatus.OK)
  async sendProducer(@Body() body: any): Promise<any> {
    const { type, data } = body;

    if (Array.isArray(data)) {
      data.map(async (value: any) => {
        await this.checkService.sendProducer({ data: value, type });
      });
    } else {
      await this.checkService.sendProducer({ type, data });
    }
    return { message: 'Data Sended to Producer', Success: 'True' };
  }
}
