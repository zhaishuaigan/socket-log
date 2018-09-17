var http = require('http');
var app  = http.createServer(handler)
var io   = require('socket.io')(app);
var api  = require('./api.js');

app.listen(80);

var sockets = {};

function handler(req, res) {
    api.run(req, res, io, sockets);
}


io.on('connection', function (socket) {
    sockets[socket.id] = socket;
    socket.emit('news', {hello: 'world'});
    socket.on('admin', function (data) {
        console.log(data);
    });
    socket.on('client', function (data) {
        socket.extra = data;
        console.log(data);
    });
    socket.on('ping-server', function (data) {
        console.log('ping: ', socket.id, data);
        socket.emit('client-pang', data);
    });

    socket.on('disconnecting', (reason) => {
        delete sockets[socket.id];
    });
});

console.log('server is start ...');