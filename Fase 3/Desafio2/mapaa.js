const fs = require('fs').promises

async function main() {
    try{

        const string = await fs.readFile('./package.json', 'utf-8')
        const object = await JSON.parse(string)
        const stats = await fs.stat('./package.json')
        
        
        let info = {
        contenidoStr: string, 
        contenidoObj: object,
        size: stats.size      
        }
        
        console.log(info)
        
    
        const contenido = JSON.stringify(info, null, '\t')
        
        await fs.writeFile('./info.txt', contenido)
    }catch(error){
        console.log(error)
    }
}

main()