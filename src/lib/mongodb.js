import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export function dbConnect(cName) {
  return client.db(dbName).collection(cName);
}
