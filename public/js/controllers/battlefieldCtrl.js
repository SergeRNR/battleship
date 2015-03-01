define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('BattlefieldCtrl', ['$scope', 'BattlefieldService',
        function ($scope, BFS) {
            $scope.matrixClick = function (e) {
                console.log(BFS.getCoords(e));
            };
        }
    ]);
});