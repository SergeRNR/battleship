define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('MenuController', ['$scope', 'BattleshipService', 'XYService',
        function ($scope, BSS, XYS) {
            var state = 'order';

            $scope.changeState = function () {
                if (state === 'order')
                    state = 'fight';
                else
                    state = 'order';
            };

            $scope.addShips = function () {
                BSS.addRandomShips();
            };
        }
    ]);
});