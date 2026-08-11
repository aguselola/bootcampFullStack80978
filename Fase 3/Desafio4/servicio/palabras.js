import dao from '../dao/palabrasDAO.js'
import crypto from 'crypto'

export class PalabrasServicio {
    async agregarPalabra(palabra) {
        const palabras = await dao.obtenerPalabras();

        const nuevaPalabra = {
            id: crypto.randomUUID(),
            palabra,
            timestamp: Date.now(),
        };

        palabras.push(nuevaPalabra);

        await dao.guardarPalabras(palabras);

        return nuevaPalabra;
    }

    async obtenerFrase() {
        const palabras = await dao.obtenerPalabras();

        const frase = palabras
            .map((item) => item.palabra)
            .join(' ');

        return frase;
    }
}