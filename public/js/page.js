/**
 * Created by Sondre Erstad on 22/08/2017.
 */
$(function () {
    var socket = io();
    $('form').submit(function () {
        socket.emit('message', $('#m').val());
        var text = $('#username').html() + ': '+ $('#m').val();
        $('#messages').append($('<li class="user">').text(text));
        $('#m').val('');
        return false;
    });

    socket.on('message', function(message){
        $('#messages').append($('<li>').text(message));
    });

    socket.on('user update', function (message) {
        $('#messages').append($('<li class="connection">').text(message));
    });

    socket.on('username', function (username) {
        $('#username').text(username);
    });

    socket.on('update userbase', function (a_list) {
        $('#userbase').empty();
        $('#userbase').append($('<li>').text('Current users in chat:'));
        for (var i = 0; i < a_list.length; i++){
            $('#userbase').append($('<li>').text(a_list[i]));
        }
    })
});