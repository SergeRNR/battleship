define([
    './module',
    'underscore'
], function (services, _) {
    'use strict';
    services.service('XYService', function () {
        var ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
            COLS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            cell_size = 36,
            ships_coord = [],
            ships_area = [],

            self = this;

        var getFieldDOM = function (id) {
            return document.getElementById(id);
        };

        var in_range = function (n) {
            return (n >= 0 && n <= 9);
        };

        var is_free = function (codes) {
            var c;

            for (var i=codes.length; i--;) {
                c = codes[i];
                if ( _.contains(ships_coord, c) || _.contains(ships_area, c) ) {
                    return false;
                }
            }
            return true;
        };

        var get_ship_matrix = function (base, type) {
            var hash = [],
                axle,
                j;

            if (in_range(base.x + type-1)) {
                axle = [],
                    j = type-1;
                while (j > -1) {
                    axle.push(self.getXYCode(base.x + j, base.y));
                    j--;
                }
                hash.push(axle);
            }

            if (in_range(base.y + type-1)) {
                axle = [],
                    j = type-1;
                while (j > -1) {
                    axle.push(self.getXYCode(base.x, base.y + j));
                    j--;
                }
                hash.push(axle);
            }

            return hash;
        };

        var get_ship_area = function (codes) {
            var result = [];

            _.each(codes, function (c) {
                var xy = self.getCodeXY(c, 1),
                    x = xy.x,
                    y = xy.y;

                result = result.concat([
                    // top
                    self.getXYCode(x-1,y-1),
                    self.getXYCode(x,y-1),
                    self.getXYCode(x+1,y-1),
                    // side
                    self.getXYCode(x-1,y),
                    self.getXYCode(x+1,y),
                    // bottom
                    self.getXYCode(x-1,y+1),
                    self.getXYCode(x,y+1),
                    self.getXYCode(x+1,y+1)
                ]);
            });
            return _.uniq(result);
        };

        this.getScales = function () {
            return {
                y: ROWS,
                x: COLS
            };
        };

        this.getECode = function (e) {
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

        this.getCodeXY = function (code, field) {
            var el = getFieldDOM(field),
                props = el.getBoundingClientRect(),
                cell_size = (props.width-2) / 10,
                arr = code.split(''),
                x = arr[2] ? COLS.indexOf(arr[1]+arr[2]) : COLS.indexOf(arr[1]),
                y = ROWS.indexOf(arr[0]);

            return {x:x, y:y, s:cell_size};
        };

        this.getXYCode = function (x,y) {
            return ROWS[y] + COLS[x];
        };

        this.getRandomCell = function () {
            var x = _.random(0,9),
                y = _.random(0,9);
            return {
                x: x,
                y: y,
                cell: ROWS[y] + COLS[x]
            };
        };

        this.getCellSize = function () {
            return cell_size;
        };

        this.getShipXY = function (type) {
            var base,
                matrix,
                codes;

            var check_matrix = function () {
                base = self.getRandomCell();
                matrix = get_ship_matrix(base, type);

                if (matrix.length === 0)
                    return false;

                for (var i = matrix.length; i--;) {
                    if ( is_free(matrix[i]) )
                        return matrix[i];
                }

                return false;
            };

            codes = check_matrix();

            while (!codes) {
                codes = check_matrix();
            }

            ships_coord = ships_coord.concat(codes);
            ships_area = ships_area.concat(get_ship_area(codes));

            return codes;
        };
    });
});