var express = require('express');
var path = require('path')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
   socket.on('chat message', function (msg) {
       io.emit('chat message', msg);
   });
});

http.listen(3000, function () {
    console.log('Listening on *: 3000');
});
