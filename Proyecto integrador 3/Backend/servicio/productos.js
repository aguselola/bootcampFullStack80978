import Producto from '../validaciones/productos.js';
import * as ProductoModel from '../model/producto.js';

class ServicioProductos {
  async obtenerProductos(id) {
    if (id) {
      return ProductoModel.obtenerPorId(id);
    }
    return ProductoModel.obtenerTodos();
  }

  async guardarProducto(datos) {
    const datosNormalizados = {
      ...datos,
      precio: Number(datos.precio),
      stock: parseInt(datos.stock, 10),
      envio: Boolean(datos.envio),
      detalles: datos.detalles ?? '',
    };
    const producto = new Producto(datosNormalizados);
    producto.validar();
    return ProductoModel.crear(datosNormalizados);
  }

  async actualizarProducto(id, datos) {
    const datosNormalizados = {
      ...datos,
      precio: Number(datos.precio),
      stock: parseInt(datos.stock, 10),
      envio: Boolean(datos.envio),
      detalles: datos.detalles ?? '',
    };
    const producto = new Producto(datosNormalizados);
    producto.validar();
    const actualizado = await ProductoModel.actualizar(id, datosNormalizados);
    if (!actualizado) return null;
    return ProductoModel.obtenerPorId(id);
  }

  async borrarProducto(id) {
    const producto = await ProductoModel.obtenerPorId(id);
    if (!producto) return null;
    await ProductoModel.eliminar(id);
    return producto;
  }
}

export default ServicioProductos;