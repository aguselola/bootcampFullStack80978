import { getDB } from '../config/db.js';

export async function guardarPedido(pedido) {
  const resultado = await getDB().collection('pedidos').insertOne({
    ...pedido,
    createdAt: new Date(),
  });
  return resultado.insertedId;
}