import { Router } from 'express';
import { listarProductos, agregarProductos } from '../controlador/productos.js';

const router = Router();
router.get('/', listarProductos);
router.post('/', agregarProductos);


export default router;