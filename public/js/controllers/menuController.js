'use strict';
var angular = require('angular');

angular.module('bsApp')
.controller('MenuController', ['$scope', 'BattleshipService',
    function ($scope, BSS) {
        var state = 'order';

        $scope.changeState = function () {
            if (state === 'order')
                state = 'fight';
            else
                state = 'order';
        };

        $scope.addShips = function () {
            BSS.addRandomShips(1);
        };
    }
]);