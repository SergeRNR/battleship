define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('BattlefieldCtrl', ['$scope', 'BattlefieldService',
        function ($scope, BFS) {
            var cells = [];

            $scope.cells = cells;
            $scope.matrixClick = function (e) {
                if (e.target.className.indexOf('fleet') !== -1) {
                    var code = BFS.getXYCode(e),
                        xy = BFS.getCodeXY(code, e.currentTarget);
                    console.log(code);
                    cells.push({top: xy.y, left: xy.x, size: xy.s});
                }
            };
        }
    ]);
});