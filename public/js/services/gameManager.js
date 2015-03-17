'use strict';
var angular = require('angular'),
    _ = require('underscore');

angular.module('bsApp')
.service('GameManager', ['WebsocketService', function (WS) {
    var gameID,
        userID;

    this.startGame = function () {
        WS.socket.connect();
    };

    this.createGame = function () {
        WS.socket.emit('createGame');
    };

    this.joinGame = function (gameCode) {
        WS.socket.emit('joinGame', { gameID: gameCode });
    };

    this.hit = function (code) {
        WS.socket.emit('my_hit', {code: code});
    };
}]);