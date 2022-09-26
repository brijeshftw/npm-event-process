import { Controller, HttpCode, Get, HttpStatus } from '@nestjs/common';

import { AppService } from 'src/app.service';

@Controller()
export class MigrationController {
  constructor(private appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello(): any {
    return this.appService.getHello();
  }
}
