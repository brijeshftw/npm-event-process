import * as mysql from 'mysql2/promise';
import * as bluebird from 'bluebird';

export const mysqlCon = {};

export async function connectToMysqlDatabase(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await mysql.createConnection({
        host: process.env.MYSQL_DB_HOSTNAME,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DB_NAME,
        Promise: bluebird,
      });
      mysqlCon['db'] = connection;
      resolve(mysqlCon);
    } catch (ex) {
      reject(ex);
    }
  });
}
