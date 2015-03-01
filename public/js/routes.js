define(['./app'], function (app) {
    'use strict';

    return app.config(['$routeProvider', function ($routeProvider) {
        var tmplPath = 'js/templates/';

        $routeProvider
            .when('/', {
                templateUrl: tmplPath+'controls.html',
                controller: 'GameCtrl'
            })
            .
            otherwise({
                redirectTo: '/'
            });
    }]);
});