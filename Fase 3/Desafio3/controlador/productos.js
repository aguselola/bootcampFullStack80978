import { obtenerProductos, crearProductos } from '../model/producto.js';

export async function listarProductos(req, res) {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

export async function agregarProductos(req, res) {
    try {
        const { nombre, precio, stock } = req.body;
        if (!nombre || precio === undefined || stock === undefined) {
        return res.status(400).json({
            error: 'Faltan campos: nombre, precio, stock',
        });
        }
        const productos = await crearProductos({ nombre, precio, stock });
        res.status(201).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}