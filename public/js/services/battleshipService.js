define([
    './module',
    'underscore'
], function (services, _) {
    'use strict';
    services.service('BattleshipService', ['XYService', function (XYS) {
        var ships = {};

        this.addShip = function (code, field, status) {
            var xy = XYS.getCodeXY(code, field);

            if (!ships[field])
                ships[field] = [];

            ships[field].push({
                code: code,
                status: status,
                top: xy.y,
                left: xy.x,
                size: xy.s
            });
        };

        this.getShips = function () {
            return ships;
        };

        this.hitShip = function (code, field) {
            var i = _.findIndex(ships[field], function (n) {return n.code == code});

            if (i !== -1) {
                ships[field][i].status = 0;
                return true;
            } else {
                return false;
            }
        };
    }]);
});