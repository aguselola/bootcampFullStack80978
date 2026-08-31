import { getDB } from '../config/db.js';

export async function guardarPedido(pedido) {
  const documento = Array.isArray(pedido)
    ? { productos: pedido, createdAt: new Date() }
    : { ...pedido, createdAt: new Date() };

  const resultado = await getDB().collection('pedidos').insertOne(documento);
  return resultado.insertedId;
}