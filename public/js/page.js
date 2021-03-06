/**
 * Created by Sondre Erstad on 22/08/2017.
 */
$(function () {
    var socket = io();
    $('form').submit(function () {
        // push to others:
        var $m = $('#m');
        socket.emit('message', $m.val());
        // push to self:
        var text = $('#username').html() + ': '+ $m.val();
        $('#messages').append($('<li class="user">').text(text));
        scroll();
        $m.val(''); // Reset input field.
        return false;
    });

    socket.on('message', function(message){
        $('#messages').append($('<li>').text(message));
        scroll();
    });

    socket.on('user update', function (message) {
        $('#messages').append($('<li class="connection">').text(message));
        scroll();
    });

    socket.on('username', function (username) {
        $('#username').text(username);
        scroll();
    });

    socket.on('update userbase', function (a_list) {
        var  $userbase = $('#userbase');

        $userbase.empty();
        $userbase.append($('<li>').text('Current users in chat:'));

        for (var i = 0; i < a_list.length; i++){
            $userbase.append($('<li>').text(a_list[i]));
            scroll();
        }
    })

    function scroll() {
        $('html, body').animate({scrollTop:$(document).height()}, 'slow');
    }
});