var express = require('express');
var path = require('path')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var randomNames = require('./users');


var current_users = {};
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log(current_users)
    var user = randomNames.generateUsernam(current_users);
    console.log(user + ' Just connected');
    current_users[user] = true;
    io.emit('new user', user)
    socket.on('chat message', function (msg) {
       io.emit('chat message', msg, user);
   });

   socket.on('disconnect', function () {
       delete current_users[user];
       console.log(user + ' disconected')
   })
});

http.listen(3000, function () {
    console.log('Listening on *: 3000');
});
