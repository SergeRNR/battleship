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
                var code = XYS.getRandomCell();
                while (!BFS.isAvailableCell(code, id) || BFS.noCellsLeft(id)) {
                    code = XYS.getRandomCell();
                }
                BFS.hitField(code, id);
            };

            $scope.matrixClick = function (e, id) {
                var className = e.target.className,
                    code = XYS.getXYCode(e);

                if (BFS.isMine(id)) {
                    console.log('This is your fleet!');
                    //AI(id);
                    return;
                }

                if (className.indexOf('fleet') !== -1) {
                    var r = Math.floor(Math.random()*10);
                    if (r === 7)
                        BSS.addShip(code, id, 1);
                    BFS.hitField(code, id);
                    AI(1);

                } else if (className.indexOf('ship') !== -1) {
                    //BSS.hitShip(code, field);
                }
            };

            init();
        }
    ]);
});