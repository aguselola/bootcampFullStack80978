import { PalabrasServicio } from '../servicio/palabras.js'
import { validarPalabra } from '../validaciones/palabras.js'

const servicio = new PalabrasServicio();

export async function agregarPalabra(req, res) {
    try {
        const resultado = validarPalabra(req.body);

        if (!resultado.ok) {
        return res.status(400).json({ error: resultado.mensaje });
        }

        const { palabra } = resultado.value;
        const nuevaPalabra = await servicio.agregarPalabra(palabra);

        return res.status(201).json(nuevaPalabra);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al agregar la palabra' });
    }
}

export async function obtenerFrase(req, res) {
    try {
        const frase = await servicio.obtenerFrase();
        return res.json({ frase });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener la frase' });
    }
}