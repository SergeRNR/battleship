'use strict';
var angular = require('angular'),
    _ = require('underscore'),
    io =require('../../assets/libs/socket.io');

angular.module('bsApp')
.service('WebsocketService', function () {
    var socket = io();

    socket.on('connected', function (data) {
        console.log(data.message);

        socket.on('newGameCreated', function (data) {
            console.log('New game:', data);
        });

        socket.on('playerJoinedGame', function (data) {
            console.log('The player:', data.socketID, ' joined the game', data.gameID);
        });

        socket.on('hit', function (data) {
            console.log(data);
        });

    });

    this.socket = socket;
});