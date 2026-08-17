import type { Db, MongoClient } from 'mongodb';
import type { Mongoose } from 'mongoose';

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
  var _mongoClient: MongoClient | undefined;
  var _mongoDb: Db | undefined;
}

export {};
