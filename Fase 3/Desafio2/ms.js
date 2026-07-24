const fs = require('fs')

try{

  const string = fs.readFileSync('./package.json', 'utf-8')
  const object = JSON.parse(string)
  const stats = fs.statSync('./package.json')
  
  let info = {
    contenidoStr: string, 
    contenidoObj: object,
    size: stats.size      
  }
  
  console.log(info)
  

  const contenido = JSON.stringify(info, null, '\t')
  
  fs.writeFileSync('./info.txt', contenido)

} catch (error){
  console.log(error)
}