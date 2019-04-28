const watcher = require('./file_watcher');
const fs = require('fs')
const watchFolder = updateFilePath('watch folder')
const processedFolder = updateFilePath('processed')


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

const directoryWatcher = new watcher(watchFolder, processedFolder)

directoryWatcher.on('process', (file) =>{
    const watchFile = `${watchFolder}/${file}`;
    const processedFile = `${processedFolder}/${file.toLowerCase()}`;
    fs.rename(watchFile, processedFile, err =>{
        if (err) {throw err;}
    });
});

directoryWatcher.start()