import { preference } from './pago_temp.js';
import * as PedidoModel from '../model/pedido.js';

export async function guardarPedido(pedido) {
  return PedidoModel.guardarPedido(pedido);
}

export async function createPreference(datos) {
  const preferences = await preference.create(datos.prefItems);
  return preferences.id;
}