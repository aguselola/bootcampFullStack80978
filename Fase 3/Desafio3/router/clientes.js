import { Router } from 'express';
import { listarClientes, agregarCliente } from '../controlador/clientes.js';

const router = Router();
router.get('/', listarClientes);   // GET  /api/clientes
router.post('/', agregarCliente);  // POST /api/clientes

export default router;