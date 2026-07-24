const fs = require('fs')
fs.readFile('./package.json','utf-8', (error, datos) =>{
    if(error){
        console.log(error)
        return
    }

    const string = datos
    
    const object = JSON.parse(string)
   

    fs.stat('./package.json', (error, stats) =>{
        if(error){
            console.log('Stats error:', error)
            return
        }
        const size = stats.size

        let info = {
            contenidoStr: string, 
            contenidoObj: object,
            size      
        }

        console.log(info)
        const contenido = JSON.stringify(info, null, '\t')
        fs.writeFile('./info.txt', contenido, (error)=>{
            if(error){
                console.log('writeFile error', error)
                return
            }
        })

    })

})