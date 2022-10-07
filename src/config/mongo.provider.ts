import { MongoClient } from 'mongodb';

export const dbObj = {};

export async function connectToMongoDatabase(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const client: MongoClient = new MongoClient(
        process.env.MONGODB_CONNECTION_STRING,
        {
          keepAlive: true, 
          useUnifiedTopology: true,
        },
      );
      await client.connect();
      dbObj['db'] = client.db(process.env.MONGO_DATABASE_NAME);
      resolve(dbObj);
    } catch (ex) {
      reject(ex);
    }
  });
}
