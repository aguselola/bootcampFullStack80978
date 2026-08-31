import Joi from 'joi';
class Producto {
  constructor({ nombre, precio, stock, marca, categoria, detalles, foto, envio }) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.marca = marca;
    this.categoria = categoria;
    this.detalles = detalles;
    this.foto = foto;
    this.envio = envio;
  }
  validar() {
    const productoSchema = Joi.object({
      nombre: Joi.string().min(3).max(20).required(),
      precio: Joi.number().min(0).max(1000000).required(),
      stock: Joi.number().integer().min(0).max(999).required(),
      marca: Joi.string().required(),
      categoria: Joi.string().required(),
      detalles: Joi.string().required(),
      foto: Joi.string().required(),
      envio: Joi.boolean().required(),
    });
    const producto = {
      nombre: this.nombre,
      precio: this.precio,
      stock: this.stock,
      marca: this.marca,
      categoria: this.categoria,
      detalles: this.detalles,
      foto: this.foto,
      envio: this.envio,
    };
    const { error } = productoSchema.validate(producto);
    if (error) {
      const err = new Error(error.details[0].message);
      err.name = 'ValidationError';
      throw err;
    }
  }
}
export default Producto;