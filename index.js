var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
    res.send('<h1>Hello pc screen</h1>');
});

http.listen(3000, function () {
    console.log('Listening on *: 3000');
});
