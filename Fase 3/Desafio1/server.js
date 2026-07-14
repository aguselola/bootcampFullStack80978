import express from 'express'
const app = express()
const PORT = 8080

const controladorRutaNoImplementada = (req,res) => {
    const { method, url } = req
    res.status(404).send(`
        <h4>
            La petición de la ruta <span style="color:red;">${url}</span> no está implementada.
        </h4>
    `)
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.get('/', (req, res) =>{
    res.send(`<h2>Bienvenidos al sitio, solicite al servidor la hora y lo saludaremos</h2>`)
})
app.get('/hora', (req, res) => {
    const fechaActual = new Date();
    const hora = fechaActual.getHours();

    let textoH2 = '';

    if (hora >= 6 && hora < 12) {
        textoH2 = '¡Buenos días!';
    } else if (hora >= 12 && hora < 20) {
        textoH2 = '¡Buenas tardes!';
    } else {
        textoH2 = '¡Buenas noches!';
    }

    res.send(`<h2>${textoH2}</h2>`);
});

app.use(controladorRutaNoImplementada);

