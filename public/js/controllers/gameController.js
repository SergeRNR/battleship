'use strict';
var angular = require('angular');

angular.module('bsApp')
.controller('GameController', [
    '$scope', 'BattlefieldService', 'BattleshipService', 'XYService', 'GameManager',
    function ($scope, BFS, BSS, XYS, GM) {
        (function () {
            // DOM elements
            $scope.scales = XYS.getScales();
            $scope.fields = BFS.getFields();
            $scope.hits = BFS.getCells();
            $scope.ships = BSS.getShips();

            // test fields
            BFS.addField('AI');
            BFS.addField('own');
        })();

        var AI = function (id) {
            var code = XYS.getRandomCell().cell;
            while (!BFS.isAvailableCell(code, id)) {
                if (BFS.noCellsLeft(id)) {
                    console.log('No cells left');
                    return;
                }

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
                //AI(1);
            }

            GM.hit(code);
        };

        this.game = GM;
        this.game.startGame();
    }
]);