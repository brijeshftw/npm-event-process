import { Injectable } from '@nestjs/common';
import { dbObj } from '../config/mongo.provider';

@Injectable()
export class MongoService {
  async storeInMongo(collectionName: string, data: any): Promise<any> {
    try {
      return await dbObj['db']['collection'](collectionName).insertOne(data);
    } catch (ex) {
      return {
        error: true,
        message: 'Error while Inserting in Mongo',
        errorMessage: ex,
      };
    }
  }
}
