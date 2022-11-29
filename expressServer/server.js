const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const folder = '../frontend';

var server = http.createServer(function (request, response) {
    console.log(request.url);
    var filePath = folder + request.url;
    if (filePath == (folder + '/')) {
        filePath += 'index.html';
    }
    var extname = String(path.extname(filePath)).toLowerCase();
    var contentTypeDict = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.jpg': 'image/jpg',
    };
    var contentType = contentTypeDict[extname];
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('public/404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content);
                });
            }
            else {
                response.writeHead(500);
                response.end(error.code);
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content);
        }
    });
});

server.on('listen', () => {
    console.log(`Server started at ${server.address().address}:${server.address().port}`);
});

server.listen(port);