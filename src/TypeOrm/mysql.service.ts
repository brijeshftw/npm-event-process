import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import { mysqlCon } from './mysql.provider';
import { UtilsService } from './utils/utils.service';

@Injectable()
export class MysqlService {
  @InjectKnex() private readonly knex: Knex;
  constructor(private utilsService: UtilsService) {}

  async getFromMysql(rawQuery: string): Promise<any> {
    const [rows] = await mysqlCon['db'].execute(rawQuery);
    return rows;
  }

  async saveInMysql(newData: any): Promise<any> {
    const { data, type } = newData;

    if (type.includes('checkout')) {
      return this.utilsService.checkout(data);
    }

    if (type.includes('logout')) {
      return this.utilsService.signout(data);
    }

    if (type.includes('login')) {
      return this.utilsService.login(data);
    }
    if (type.includes('checkin')) {
      return this.utilsService.checkin(data);
    }
  }
}








