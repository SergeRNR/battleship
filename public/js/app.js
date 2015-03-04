define([
    'angular',
    './angular-modules',
    './controllers/index',
    './services/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.controllers',
        'app.services'
        //'ngRoute'
    ]);
});