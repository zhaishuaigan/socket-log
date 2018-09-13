var fs          = require('fs');
var queryString = require('querystring');
var api         = {};

api.run = function (req, res, io, sockets) {
    console.log('req: ', req.url);
    switch (req.url) {
        case '/favicon.ico':
            res.writeHead(200);
            res.end();
            break;
        case '/':
        case '/index.html':
            api.readFile('/index.html', res);
            break;
        case '/write':
            api.getPostData(req, function (data) {
                console.log(data);
                res.writeHead(200);
                io.emit('write', JSON.parse(data.logs));
                res.end(JSON.stringify(data));
            });

            break;
        default:
            api.readFile(req.url, res);
            break;
    }
};

api.getPostData = function (req, callback) {
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
        console.log("chunk:", chunk);
    });
    req.on('end', function () {
        body = queryString.parse(body);
        callback(body);
    });
};

api.readFile = function (filename, res) {
    fs.readFile(__dirname + '/static' + filename, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('not find:' + '/static' + filename);
        }
        res.writeHead(200);
        res.end(data);
    });
};

module.exports = api;