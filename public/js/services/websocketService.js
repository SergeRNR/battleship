'use strict';
var angular = require('angular'),
    _ = require('underscore'),
    io =require('../../assets/libs/socket.io');

angular.module('bsApp')
.service('WebsocketService', function () {
    var IO = io();
    IO.on('connect', function () {

        console.log('I\'m connected to the NodeJS server');

        IO.on('hit', function (data) {
            console.log(data);
        });

    });

    this.io = IO;
});