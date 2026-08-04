import { getDB } from '../config/db.js';


const coleccion = () => getDB().collection('clientes');

export async function obtenerClientes() {
    return coleccion().find({}).toArray();
}


export async function crearCliente(cliente) {
    const resultado = await coleccion().insertOne(cliente);
    return { _id: resultado.insertedId, ...cliente };
}