// db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = 'mongodb://mongodb:27017';
const dbName = process.env.MONGO_DATABASE.toString();
const collectionName = process.env.MONGO_COLLECTION.toString();

async function connectToMongoDB() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return { client, collection };
}

module.exports = {
  connectToMongoDB,
};
