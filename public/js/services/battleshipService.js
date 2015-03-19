'use strict';
var angular = require('angular'),
    _ = require('underscore');

angular.module('bsApp')
.service('BattleshipService', ['XYService', function (XYS) {
    var ships = window.ships = {},
        fleet = [4,3,3,2,2,2,1,1,1,1],
        //fleet = [1],

        self = this;

    var Ship = function (id, code, xy, state) {
        this.id = id || _.random(1E5, 1E6-1);
        this.code = code;
        this.state = state;
        this.y = xy.y;
        this.x = xy.x;
    };

    Ship.prototype.size = XYS.getCellSize();

    Ship.prototype.setState = function (state) {
        this.state = state;
    };

    this.addShip = function (id, code, field, state) {
        var xy = XYS.getCodeXY(code),
            ship = new Ship(id, code, xy, state);

        if (!ships[field])
            ships[field] = [];

        ships[field].push(ship);

    };

    this.getShips = function () {
        return ships;
    };

    this.hitShip = function (code, field) {
        var ship = _.findWhere(ships[field], {code: code});

        if (ship) {
            ship.setState(0);
            return true;
        } else {
            return false;
        }
    };

    this.addRandomShips = function (field) {
        if (ships[field])
            return;

        console.time('The fleet is ready!');
        _.each(fleet, function (f) {
            var codes = XYS.getShipXY(f),
                id = Math.floor(Math.random()*1e7);

            _.each(codes, function (c) {
                self.addShip(id, c, field, 1);
            });
        });
        console.timeEnd('The fleet is ready!');
    };
}]);