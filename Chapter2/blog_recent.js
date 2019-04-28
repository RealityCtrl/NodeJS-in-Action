const http = require('http');
const fs = require('fs');
const workingDir = process.cwd();

let jsonPath = 'titles.json';
let templatePath = 'template.html';

if (workingDir.endsWith("Action")){
    jsonPath = './Chapter2/'+jsonPath
    templatePath= './Chapter2/'+templatePath
}else{
    jsonPath = './'+jsonPath
    templatePath= './'+templatePath
}

http.createServer((req,res) =>{
    if (req.url == '/'){
        fs.readFile(jsonPath, (err, data) =>{
            if(err){
                logError(err, res)
            }else{
                const titles = JSON.parse(data.toString());
                fs.readFile(templatePath, (err, data) =>{
                    if(err){
                        logError(err, res)
                    }else{
                        const template = data.toString();
                        const html = template.replace('%', titles.join('</li><li>'))
                        res.writeHead(200, {'Content-Type':'text/html'})
                        res.end(html)
                    }
                });

            }
        });
    }
}).listen(8000, '127.0.0.1')

function logError(err, res){
    console.error(err);
    res.end('Server Error')
}