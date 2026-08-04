import { getDB } from '../config/db.js';


const coleccion = () => getDB().collection('productos');

export async function obtenerProductos() {
    return coleccion().find({}).toArray();
}


export async function crearProductos(producto) {
    const resultado = await coleccion().insertOne(producto);
    return { _id: resultado.insertedId, ...producto };
}