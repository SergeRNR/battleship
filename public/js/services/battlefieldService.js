define([
    './module',
    'underscore'
], function (services, _) {
    'use strict';
    services.service('BattlefieldService', function () {
        var ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
            COLS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],

            fields = [],
            cells = [],

            size = 400; // to be calculated

        var setSizes_ = function (el) {
            el.style.height = el.style.width = size+'px';
        };

        this.getXYCode = function (e) {
            var props = e.target.getBoundingClientRect(),
                cell_size = (props.width-2) / 10,
                cursor_correction = 14,
                x = e.x - props.left + cursor_correction,
                y = e.y - props.top + cursor_correction;

            x = Math.floor(x / cell_size); // cell index
            x = Math.min(x, 9); // prevent fault of custom cursor
            y = Math.floor(y / cell_size);
            y = Math.min(y, 9);

            return ROWS[y] + COLS[x];
        };

        this.getCodeXY = function (code, el) {
            var props = el.getBoundingClientRect(),
                cell_size = (props.width-2) / 10,
                arr = code.split(''),
                x = arr[2] ? COLS.indexOf(arr[1]+arr[2]) : COLS.indexOf(arr[1]),
                y = ROWS.indexOf(arr[0]);

            x = props.left + x * cell_size;
            y = props.top + y * cell_size;

            return {x:x, y:y, s:cell_size};
        };

        this.testRandom = function () {
            var hash = [],
                x,
                y,
                count = 0,
                cell;

            console.time('t');
            while (count < 100) {
                x = Math.floor(Math.random()*10);
                y = Math.floor(Math.random()*10);
                cell = ROWS[y] + COLS[x];
                if (hash.indexOf(cell) === -1) {
                    hash.push(cell);
                    count++;
                }
            }
            console.log(hash.sort());
            console.timeEnd('t');
        };

        this.addField = function (type) {
            var data = {
                type: type,
                id: Math.floor(Math.random() * 10E7)
            };
            fields.push(data);
        };

        this.getFields = function () {
            return fields;
        };

        this.addCell = function (e, code, field, type) {
            if (e.target.className.indexOf('fleet') !== -1) {
                var code = this.getXYCode(e),
                    xy = this.getCodeXY(code, e.currentTarget);

                console.log(code);
                cells.push({ code: code, type: '', top: xy.y, left: xy.x, size: xy.s });
            }
        };

        this.getCells = function () {
            return cells;
        };

        this.getScales = function () {
            return {
                y: ROWS,
                x: COLS
            };
        };
    });
});