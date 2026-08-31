import express from 'express';
import config from './config/config.js';
import { conectarDB } from './config/db.js';
import productosRouter from './router/productos.js';
import carritoRouter from './router/carrito.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

async function iniciar() {
  try {
    await conectarDB();
    app.listen(config.port, () => {
      console.log(`Servidor en http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Error al iniciar:', error.message);
  }
}
iniciar();