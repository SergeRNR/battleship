define([
    './module',
    'underscore'
], function (services, _) {
    'use strict';
    services.service('BattlefieldService', ['BattleshipService', 'XYService', function (BSS, XYS) {
        var fields = [],
            hits = {},
            my_field = 0,
            size = 400; // to be calculated

        var setSizes_ = function (el) {
            el.style.height = el.style.width = size+'px';
        };

        this.addField = function (type) {
            var data = {
                type: type,
                id: (type === 'own' ? 1 : 2)
            };
            fields.push(data);

            if (type === 'own')
                my_field = data.id;
        };

        this.getFields = function () {
            return fields;
        };

        this.addCellByCode = function (code, field) {
            var xy = XYS.getCodeXY(code, field);

            if (!hits[field])
                hits[field] = [];

            hits[field].push({
                code: code,
                top: xy.y,
                left: xy.x,
                size: xy.s
            });
        };

        this.getCells = function () {
            return hits;
        };

        this.isMine = function (field) {
            return field == my_field;
        };

        this.hitField = function (code, field) {
            if (!BSS.hitShip(code, field))
                this.addCellByCode(code, field);
        };

        this.isAvailableCell = function (code, field) {
            var cell_i = _.findIndex(hits[field], function (n) {return n.code == code}),
                ship_i = _.findIndex(BSS.getShips()[field], function (n) {return n.code == code && n.status === 0});

            if (cell_i !== -1)
                return false;
            else if (ship_i !== -1)
                return false;
            else
                return true;

            return cell_i === -1 || ship_i === -1;
        };

        this.noCellsLeft = function (field) {
            return (this.getCells()[field] ? this.getCells()[field].length : 0) +
                    (BSS.getShips()[field] ? BSS.getShips()[field].length : 0) === 100;
        };
    }]);
});