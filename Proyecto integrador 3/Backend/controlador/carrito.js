import * as PedidoModel from '../model/pedido.js';
import * as CarritoServicio from '../servicio/carrito.js';

export async function recibirCarrito(req, res) {
  try {
    const carrito = req.body;
    console.log('===== PEDIDO RECIBIDO =====');
    console.log(JSON.stringify(carrito, null, 2));
    console.log('===========================');
    await CarritoServicio.guardarPedido(carrito);
    res.status(201).json({
      mensaje: 'Pedido recibido correctamente',
      recibido: carrito,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar el carrito' });
  }
}

export async function createPreference(req, res) {
  try {
    const preferenceId = await CarritoServicio.createPreference(req.body);
    res.json(preferenceId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}