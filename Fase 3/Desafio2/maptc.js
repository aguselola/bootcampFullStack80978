const fs = require('fs').promises

fs.readFile('./package.json','utf-8')
    .then((datos) =>{
        const string = datos
        const object = JSON.parse(string)

        return fs.stat('./package.json').then((stats) => {
            return {
            string: string,
            object: object,
            size: stats.size
            }
        })    
    })
    
    .then((paquete) =>{

        let info = {
            contenidoStr: paquete.string, 
            contenidoObj: paquete.object,
            size: paquete.size 
        }

        console.log(info)
        const contenido = JSON.stringify(info, null, '\t')
        return fs.writeFile('./info.txt', contenido)
    })
    
    .catch((error)=>{
        console.log(error)
    })
