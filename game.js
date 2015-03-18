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
        var room = this.adapter.rooms[data.gameID],
            rivalID;

        if (!room) {
            this.emit('gameError', {message: 'Invalid game code'});
            return;
        }

        this.join(data.gameID);

        rivalID = _.keys(_.omit(room, this.id)).pop();

        this.broadcast.to(data.gameID).emit('playerJoinedGame', { gameID: data.gameID, socketID: this.id });
        this.emit('playerJoinedGame', { gameID: data.gameID, socketID: rivalID });
    };

    var hit = function (data) {
        //io.to(data.socketID).emit('hit', { code: data.code, socketID: data.socketID });
        io.emit('hit', { code: data.code, socketID: data.socketID });
    };

    var disconnect = function () {
        console.log('Client *** ', this.id, ' *** is disconnected');
    };

    socket.emit('connected', { message: 'You are connected with ID: ' + socket.id });

    socket.on('createGame', createGame);
    socket.on('joinGame', joinGame);
    socket.on('hit', hit);
    socket.on('disconnect', disconnect);
};