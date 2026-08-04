import express from 'express'
import { conectarDB } from './config/db.js';
import clientesRouter from './router/clientes.js';
import productosRouter from './router/productos.js';


const app = express()

app.use(express.json())

app.use('/api/clientes', clientesRouter);
app.use('/api/productos', productosRouter);


app.get('/', (req, res) => {
  res.json({ mensaje: 'API empresa' });
});

async function iniciar() {
  try {
    await conectarDB(); // 1) primero Mongo
    app.listen(3000, () => { // 2) después escuchar
      console.log('Servidor en http://localhost:3000');
    });
  } catch (error) {
    console.error('No arrancó:', error.message);
  }
}
iniciar();