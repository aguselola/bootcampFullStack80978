import { MongoClient } from 'mongodb'


const uri = 'mongodb://localhost:27017/empresa';
const cliente = new MongoClient(uri);

let db;


export async function conectarDB() {
  await cliente.connect();
  db = cliente.db('empresa');
  console.log('Conectado a MongoDB');
  return db;
}

export function getDB() {
  if (!db) {
      throw new Error('La base de datos no está conectada');
    }
    return db;
}
