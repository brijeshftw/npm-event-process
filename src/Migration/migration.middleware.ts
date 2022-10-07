import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { MongoService } from '../Mongo/mongo.service';

@Injectable()
export class MIgrationMiddleware implements NestMiddleware {
  constructor(private mongoService: MongoService) {}

  validateMessage = (type: string, data: any): boolean => {
    return (
      data !== undefined &&
      type !== undefined &&
      (type.startsWith('save-') || type.startsWith('sync-'))
    );
  };

  async use(req: Request, res: Response, next: NextFunction) {
    const { data, type } = req.body;
    req.body.app_name = 'legacy_event_service';

    if (!this.validateMessage(type, data)) {
      let errMessage = 'INVALID DATA';
      errMessage =
        type != undefined
          ? !type.startsWith('save-')
            ? 'INVALID type'
            : errMessage
          : errMessage;

      this.mongoService
        .storeInMongo(process.env.MONGO_LOGGER_COLLECTION, {
          type: type,
          data: req.body,
          error: errMessage,
          is_synchronized: false,
          timestamp: new Date(),
        })
        .then(() => {
          console.log('Data Store in ', process.env.MONGO_LOGGER_COLLECTION);
        })
        .catch((ex) => {
          console.log(
            'Error while Storing in ',
            process.env.MONGO_LOGGER_COLLECTION,
            '\n',
            ex,
          );
        });

      return res.json({
        error: true,
        errorMessage: errMessage,
      });
    }

    if (type.startsWith('save-') || type.startsWith('sync-')) {
      req.body.is_synchronized = true;

      this.mongoService
        .storeInMongo(process.env.MONGO_LOGGER_COLLECTION, {
          type: type,
          data: req.body.app_name,
        })
        .then(() => {
          console.log('Data Store in ', process.env.MONGO_LOGGER_COLLECTION);
        })
        .catch((ex) => {
          console.log(
            'Error while Storing in ',
            process.env.MONGO_LOGGER_COLLECTION,
            '\n',
            ex,
          );
        });
      next();
    }
  }
}
