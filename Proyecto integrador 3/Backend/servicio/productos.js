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
    const producto = new Producto(datos);
    producto.validar();
    return ProductoModel.crear(datos);
  }

  async actualizarProducto(id, datos) {
    const producto = new Producto(datos);
    producto.validar();
    const actualizado = await ProductoModel.actualizar(id, datos);
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