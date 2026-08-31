import { MongoClient } from 'mongodb';
import config from './config.js';

const client = new MongoClient(config.strCnx);
let db;

export async function conectarDB() {
  await client.connect();
  db = client.db(config.base);
  console.log('Conectado a MongoDB Atlas - base:', config.base);
  return db;
}

export function getDB() {
  if (!db) throw new Error('DB no conectada');
  return db;
}