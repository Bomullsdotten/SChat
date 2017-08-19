var express = require('express');
var path = require('path')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var names = [
   'Charlie Brown',
   'Patty	October',
   'Snoopy	October',
   'Violet Gray	February',
   'Schroeder	May',
   'Lucy van Pelt',
   'Linus van Pelt',
   'Pig-Pen',
   'Sally Brown',
   'Frieda	March',
   'Woodstock',
   'Peppermint Patty',
   'Franklin',
   'Marcie',
    'Rerun van Pelt',
    'Eudora',
    'Peggy Jean',
    'Winnie-the-Pooh',
    'Christopher Robin',
    'Piglet',
    'Eeyore',
    'Kanga',
    'Roo',
    'Rabbit',
    'Tigger',
    'Owl',
    'Gaston Lagaffe',
    'Léon Prunelle',
    'Yves Lebrac',
    'Joseph Boulier',
    'Mademoiselle Jeanne',
    'Monsieur Dupuis',
    'Jules-de-chez-Smith-en-face',
    'Bertrand Labévue',
    'Manu',
    'Aimé De Mesmaeker',
    'Joseph Longtarin',
    'Ducran & Lapoigne',
    'Freddy-les-doigts-de-fée',
    'Asterix',
    'Obelix',
    'Dogmatix',
    'Getafix',
    'Vitalstatistix',
    'Impedimenta',
    'Cacofonix',
    'Geriatrix',
    'Mrs. Geriatrix',
    'Unhygienix',
    'Bacteria',
    'Fulliautomatix',
    'Mrs. Fulliautomatix',
    'Julius Caesar',
    'Barbe Rouge',
    'Triple Patte',
    'Baba',
    'Erix',
    'Queen Cleopatra ',
    'Brutus',
    'Pompey',
    'Lucky Luke',
    'Jolly Jumper',
    'Jack Dalton',
    'William Dalton',
    'Averelle Dalton',
    'Joe Dalton',
    'Rantanplan',
    'Billy the Kid',
    'Calamity Jane',
    'Jesse James',
    'Buffalo Bill',
    'Ma Dalton',

]

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    var user = names[Math.floor(Math.random()*names.length)];
    console.log(user + ' Just connected');
   socket.on('chat message', function (msg) {
       io.emit('chat message', msg);
   });

   socket.on('disconnect', function () {
       console.log(user + ' disconected')
   })
});

http.listen(3000, function () {
    console.log('Listening on *: 3000');
});
