import express from 'express'
import config from './config/config.js'
import dao from './dao/palabrasDAO.js'
import palabrasRouter from './router/palabras.js'

const app = express();
app.use(express.json());
app.use('/palabras', palabrasRouter)

async function iniciar(){
    try{
        if (config.persistence === 'mongodb'){
            await dao.conectar();
        }

        app.listen(config.port)

    }catch (error){
        console.error('No se pudo iniciar: ', error.message)
    }

}

iniciar()