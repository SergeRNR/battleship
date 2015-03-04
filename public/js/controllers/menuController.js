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
                var code,
                    i;

                for (i=4; i--;) {
                    code = XYS.getRandomCell();
                    BSS.addShip(code, 1, 1);

                    code = XYS.getRandomCell();
                    BSS.addShip(code, 2, 1);
                }
            };
        }
    ]);
});