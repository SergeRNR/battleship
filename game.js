'use strict';
var _ = require('underscore'),
    io,
    socket;

module.exports.initGame = function (io, socket) {
    io = io;
    socket = socket;

    var createGame = function () {
        var gameID = _.random(1E4, 1E5-1);
        this.emit('newGameCreated', {gameID: gameID, socketID: this.id});
        this.join(gameID.toString());
    };

    var joinGame = function (data) {

        data.socketID = this.id;
        this.join(data.gameID);

        io.sockets.in(data.gameID).emit('playerJoinedGame', data);
    };

    var hit = function (data) {
        console.log('Hit the', data.code, 'cell');
        io.emit('hit', {code: data.code})
    };

    socket.emit('connected', { message: 'You are connected with ID: ' + socket.id });

    socket.on('createGame', createGame);
    socket.on('joinGame', joinGame);
    socket.on('my_hit', hit);
};