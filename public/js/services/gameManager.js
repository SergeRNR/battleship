'use strict';
var angular = require('angular'),
    _ = require('underscore'),
    io =require('../libs/socket.io');

angular.module('bsApp')
.service('GameManager', ['$rootScope', 'BattlefieldService', 'BattleshipService', 'XYService', function ($rootScope, BFS, BSS, XYS) {
    var gameID,
        userID,
        rivalID,
        socket = io();

    socket.on('connected', function (data) {
        console.log(data.message);
        userID = this.id;

        onConnected();

        // bind socket events
        socket.on('newGameCreated', onNewGameCreated);
        socket.on('playerJoinedGame', onPlayerJoinedGame);
        socket.on('hit', onHit);
        socket.on('rivalShipDamaged', onRivalShipDamaged);
        socket.on('gameError', onError);

        socket.on('test', onTest);
    });

    // SOCKET HANDLERS
    var onConnected = function () {
        // create user's field
        $rootScope.$apply(function(){
            BFS.addField(userID, true);
        });
    };

    // create new game and wait for the connection
    var onNewGameCreated = function (data) {
        console.log('New game:', data);
        gameID = data.gameID;
    };

    // add rival battlefield
    var onPlayerJoinedGame = function (data) {
        console.log('The player:', data.socketID, ' joined the game', data.gameID);
        rivalID = data.socketID;
        gameID = gameID || data.gameID;

        // create rival's field
        $rootScope.$apply(function(){
            BFS.addField(rivalID, false);
        });
    };

    var onHit = function (data) {
        if (data.socketID === userID)
            console.log('Your fleet was attacked:', data);

        $rootScope.$apply(function(){
            var result = BFS.hitField(data.code, data.socketID);
            if (result)
                socket.emit('shipDamaged', { gameID: gameID, code: data.code });
        });
    };

    var onRivalShipDamaged = function (data) {
        console.warn('You\'ve got this asshole!', data);
        // add damaged ship
        $rootScope.$apply(function(){
            BSS.addShip(null, data.code, data.socketID, 0);
        });
    };

    var onError = function (data) {
        console.warn(data.message);
    };

    var onTest = function (data) {
        console.log('client', data.socketID, 'check the connection')
    };
    // END SOCKET HANDLERS

    // PUBLIC METHODS
    this.getGameElements = function () {
        return {
            scales : XYS.getScales(),
            fields : BFS.getFields(),
            hits : BFS.getCells(),
            ships : BSS.getShips()
        };
    };

    // init the socket connection, after add user battlefield
    this.initGame = function () {
        socket.connect();
    };

    // create new game and get game ID
    this.createGame = function () {
        socket.emit('createGame');
    };

    // join existing game by ID
    this.joinGame = function (gameCode) {
        socket.emit('joinGame', { gameID: gameCode });
    };

    this.startGame = function () {

    };

    // field click handler
    this.hit = function (e, id) {
        var className = e.target.className,
            code = XYS.getECode(e);

        if (BFS.isMine(id)) {
            console.log('This is your fleet!');
            return;
        }

        if (className.indexOf('fleet') !== -1) {
            // you hit the ship
        }

        if (!rivalID)
            return;

        socket.emit('hit', { socketID: rivalID, code: code });
    };

    this.getUserID = function () {
        return userID;
    };

    this.test = function () {
        socket.emit('test', { gameID: gameID });
    };
}]);