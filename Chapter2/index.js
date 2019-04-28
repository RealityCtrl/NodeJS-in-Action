const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')
const configFileName = updateFilePath('rss_feeds.txt')

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

function checkForRSSFile(){
    fs.exists(configFileName, (exists) => {
        if (!exists){
            return next(new Error(`Missing RSS file: ${configFileName}`));
        }
        next(null, configFileName);
    });
}

function readRSSFile(configFileName){
    fs.readFile(configFileName, (err, feedList) => {
        if (err){return next(err);}
        feedList = feedList
            .toString()
            .replace(/^\s+|\s+$/g, '')
            .split('\n');
        const random = Math.floor(Math.random() * feedList.length);
        next(null, feedList[random]);
    });
}

function downloadRSSFeed(feedUrl){
    request({uri: feedUrl}, (err, res, body) =>{ 
        if (err) {return next(err);}
        if (res.statusCode != 200){
            return next(new Error(`Abnormal response status code: ${res.statusCode}`));
        }
        next(null, body);
    });
}

function parseRSSFeed(rss){
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if(!handler.dom.items.length){
        return next(new Error('No RSS items found'));
    }
    const item = handler.dom.items.shift();
    console.log(item.title)
    console.log(item.link);
}
const tasks = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
]

function next(err, result) {
    if (err){throw err;}
    const currentTask = tasks.shift();
    if (currentTask){
        currentTask(result);
    }
}
next();