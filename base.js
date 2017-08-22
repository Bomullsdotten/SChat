/**
 * Created by Ssondre Erstad on 21/08/2017.
 */


var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var randomNames = require('./users');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var currentUsers = {};

io.on('connection', function (socket) {
    // New client connection setup.
    var username = randomNames.generateUsername(currentUsers)
    currentUsers[username] = socket.id;
    socket.emit('username', username);
    io.emit("update userbase", activeUserMessage());
    var newUserMessage ='*'+ username + ' just connected';
    io.emit('user update', newUserMessage);

    socket.on('message', function (message) {
        var text = username + ': '+ message;
        socket.broadcast.emit('message', text);
    })

    socket.on('disconnect', function () {
        delete currentUsers[username];
        io.emit("update userbase", activeUserMessage());
    });

});

function activeUserMessage(){
    var keys = [];
    for (key in currentUsers){
        keys.push(key);
    }
    if (keys.length > 12){
        var reArray = keys.slice(0, 10)
        var rest = keys.length - reArray.length
        var message = "And " + rest+ " more users"
        reArray.push(message);
        return reArray;
    }
    return keys
}

http.listen(3000, function () {
    console.log('Listening on *: 3000');
});