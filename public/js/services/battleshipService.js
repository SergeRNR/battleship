define([
    './module',
    'underscore'
], function (services, _) {
    'use strict';
    services.service('BattleshipService', function () {
        var ship1 = {
            coords: 'A1-A3',
            length: 3,
            orientation: 'vert', // 'horiz'
            status: 2, // 2 - battleworthy, 1 - damaged, 0 - sunk
            damaged_cells: ['A2','A3']
        };

        var ship2 = {

        };

        var ships = {
            BF_ID_1 : {
                type: 1, // 1 - own, 2 - enemy, 3 - ally
                ships: [ ship1, ship2 ]
            }
        };

        this.getShips = function () {
            return ships;
        };
    });
});