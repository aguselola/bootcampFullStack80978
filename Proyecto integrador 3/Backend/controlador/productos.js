import ServicioProductos from '../servicio/productos.js';

const servicio = new ServicioProductos();

export async function listarProductos(req, res) {
  try {
    const productos = await servicio.obtenerProductos();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

export async function obtenerProducto(req, res) {
  try {
    const producto = await servicio.obtenerProductos(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

export async function crearProducto(req, res) {
  try {
    const producto = await servicio.guardarProducto(req.body);
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

export async function actualizarProducto(req, res) {
  try {
    const producto = await servicio.actualizarProducto(req.params.id, req.body);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

export async function eliminarProducto(req, res) {
  try {
    const producto = await servicio.borrarProducto(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}