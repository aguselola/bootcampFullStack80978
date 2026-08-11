import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const nombreDB = 'desafio4';        // o la que elijas
const nombreColeccion = 'palabras';
const idDocumento = 'palabras';     // _id fijo del documento

export class mongoDBDAO{

    constructor(){
        this.client = new MongoClient(uri)
    }

    async conectar(){
        await this.client.connect();
        this.coleccion = this.client.db(nombreDB).collection(nombreColeccion);
    }
    
    async obtenerPalabras() {
        const doc = await this.coleccion.findOne({ _id: 'palabras' });

        if (!doc) {
            return [];
        }

        return doc.lista;
    }

    async guardarPalabras(palabras) {
        await this.coleccion.updateOne(
            { _id: 'palabras' },
            { $set: { lista: palabras } },
            { upsert: true }
        );
    }
}