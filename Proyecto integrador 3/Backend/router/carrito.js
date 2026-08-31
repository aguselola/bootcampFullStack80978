import { Router } from 'express';
import { recibirCarrito, createPreference } from '../controlador/carrito.js';

const router = Router();

router.post('/', recibirCarrito);
router.post('/mp/create_preference', createPreference);

export default router;