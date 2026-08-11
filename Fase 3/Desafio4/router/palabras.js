import { Router } from 'express';
import { agregarPalabra, obtenerFrase } from '../controlador/palabras.js';


const router = Router();

router.get('/', obtenerFrase);
router.post('/', agregarPalabra);

export default router;