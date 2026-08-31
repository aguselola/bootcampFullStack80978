import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

function coleccion() {
  return getDB().collection('productos');
}

export async function obtenerTodos() {
  return coleccion().find({}).toArray();
}

export async function obtenerPorId(id) {
  return coleccion().findOne({ _id: new ObjectId(id) });
}

export async function crear(producto) {
  const resultado = await coleccion().insertOne(producto);
  return { _id: resultado.insertedId, ...producto };
}

export async function actualizar(id, producto) {
  const resultado = await coleccion().updateOne(
    { _id: new ObjectId(id) },
    { $set: producto }
  );
  return resultado.modifiedCount > 0;
}

export async function eliminar(id) {
  const resultado = await coleccion().deleteOne({ _id: new ObjectId(id) });
  return resultado.deletedCount > 0;
}