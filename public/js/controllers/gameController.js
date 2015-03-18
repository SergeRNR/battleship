'use strict';
var angular = require('angular');

angular.module('bsApp')
.controller('GameController', ['$scope', 'GameManager', function ($scope, GM) {
    $scope.els = GM.getGameElements();
    GM.initGame();

    //var AI = function (id) {
    //    var code = XYS.getRandomCell().cell;
    //    while (!BFS.isAvailableCell(code, id)) {
    //        if (BFS.noCellsLeft(id)) {
    //            console.log('No cells left');
    //            return;
    //        }
    //
    //        code = XYS.getRandomCell().cell;
    //    }
    //    BFS.hitField(code, id);
    //};

    $scope.matrixClick = function (e, id) {
        GM.hit(e, id);
    };
}]);