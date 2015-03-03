define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('GameController', ['$scope', 'BattlefieldService', 'BattleshipService', 'UserService',
        function ($scope, BFS, BSS, US) {
            var init = function () {
                // DOM elements
                $scope.scales = BFS.getScales();
                $scope.fields = BFS.getFields();
                $scope.cells = BFS.getCells();
                $scope.ships = BSS.getShips();

                // test fields
                BFS.addField('AI');
                BFS.addField('own');
            };

            init();

            $scope.matrixClick = function (e) {
                BFS.addCell(e);
            };
        }
    ]);
});