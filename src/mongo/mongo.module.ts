import { Module } from '@nestjs/common';

import { MongoService } from './mongo.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MongoService],
})
export class MongoModule {}
