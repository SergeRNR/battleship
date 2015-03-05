define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('GameController', ['$scope', 'BattlefieldService', 'BattleshipService', 'UserService', 'XYService',
        function ($scope, BFS, BSS, US, XYS) {
            var init = function () {
                // DOM elements
                $scope.scales = XYS.getScales();
                $scope.fields = BFS.getFields();
                $scope.hits = BFS.getCells();
                $scope.ships = BSS.getShips();

                // test fields
                BFS.addField('AI');
                BFS.addField('own');
            };

            var AI = function (id) {
                var code = XYS.getRandomCell().cell;
                while (!BFS.isAvailableCell(code, id) || BFS.noCellsLeft(id)) {
                    code = XYS.getRandomCell().cell;
                }
                BFS.hitField(code, id);
            };

            $scope.matrixClick = function (e, id) {
                var className = e.target.className,
                    code = XYS.getECode(e);

                if (BFS.isMine(id)) {
                    console.log('This is your fleet!');
                    //AI(id);
                    return;
                }

                if (className.indexOf('fleet') !== -1) {
                    AI(1);
                }
            };

            init();
        }
    ]);
});