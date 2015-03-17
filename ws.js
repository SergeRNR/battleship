'use strict';
var game = require('./game');

module.exports = function (server) {
    var io = require('socket.io')(server);
    io.on('connection', function(socket){
        console.log('Client *** ', socket.id, ' *** is connected');
        game.initGame(io, socket);
    });
    return io;
};