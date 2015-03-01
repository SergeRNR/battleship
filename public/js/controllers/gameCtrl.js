define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('GameCtrl', ['$scope',
        function ($scope) {
            $scope.btnText = 'Test control!';
        }
    ]);
});