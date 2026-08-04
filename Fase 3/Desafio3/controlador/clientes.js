import { obtenerClientes, crearCliente } from '../model/cliente.js';

export async function listarClientes(req, res) {
    try {
        const clientes = await obtenerClientes();
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
}

export async function agregarCliente(req, res) {
    try {
        const { nombre, apellido, edad, DNI } = req.body;
        if (!nombre || !apellido || edad === undefined || !DNI) {
        return res.status(400).json({
            error: 'Faltan campos: nombre, apellido, edad, DNI',
        });
        }
        const cliente = await crearCliente({ nombre, apellido, edad, DNI });
        res.status(201).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
}