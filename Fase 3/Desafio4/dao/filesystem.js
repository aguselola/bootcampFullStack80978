import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export class FilesystemDAO {
    constructor() {
        this.filePath = path.resolve('data', 'palabras.json');
    }
    async obtenerPalabras() {
        if (!existsSync(this.filePath)) {
            return [];
        }
        const contenido = await readFile(this.filePath, 'utf-8');
        const palabras = JSON.parse(contenido);
        return palabras;
    }
    
    async guardarPalabras(palabras) {
        const contenido = JSON.stringify(palabras, null, 2);
        await writeFile(this.filePath, contenido, 'utf-8');
    }
}