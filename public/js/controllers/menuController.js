'use strict';
var angular = require('angular');

angular.module('bsApp')
.controller('MenuController', ['$scope', 'BattleshipService', 'GameManager',
    function ($scope, BSS, GM) {
        var state = 'order';

        $scope.gameCode = '';

        $scope.createGame = function () {
            GM.createGame();
        };

        $scope.joinGame = function () {
            var gameCode = this.gameCode;

            if (!gameCode || isNaN(gameCode)) {
                console.warn('enter 5 digits code');
                return;
            }
            GM.joinGame(gameCode);
        };

        $scope.addShips = function () {
            BSS.addRandomShips(GM.getUserID());
        };
    }
]);