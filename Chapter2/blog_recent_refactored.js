const http = require('http');
const fs = require('fs');
const workingDir = process.cwd();

const jsonPath = updateFilePath('titles.json');
const templatePath = updateFilePath('template.html');

function updateFilePath(fileName){
    path = setFilePath();
    return path+fileName
}

function setFilePath(){
    const workingDir = process.cwd();
    if (workingDir.endsWith("Action")){
        return './Chapter2/';
    }else{
        return './';
    }
}

http.createServer((req,res) =>{
    if (req.url == '/'){
        getTitles(res);
    }
}).listen(8000, '127.0.0.1')

function getTitles(res) {
    fs.readFile(jsonPath, (err, data) => {
        if (err) {
            logError(err, res);
        }
        else {
            getTemplate(data, res);
        }
    });
}

function getTemplate(data, res) {
    const titles = JSON.parse(data.toString());
    fs.readFile(templatePath, (err, data) => {
        if (err) {
            logError(err, res);
        }
        else {
            formatHtml(data, titles, res);
        }
    });
}

function formatHtml(data, titles, res) {
    const template = data.toString();
    const html = template.replace('%', titles.join('</li><li>'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

function logError(err, res){
    console.error(err);
    res.end('Server Error')
}