define([
    './module',
    'underscore'
], function (services, _) {
    'use strict';
    services.service('XYService', function () {
        var ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
            COLS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            cell_size = 36,
            ships_coord = new Array(100),
            ships_area = new Array(100),

            self = this;

        var getFieldDOM = function (id) {
            return document.getElementById(id);
        };

        var in_range = function (n) {
            return (n >= 0 && n <= 9);
        };

        var is_free = function (codes) {
            var c, i;
            for (i=codes.length; i--;) {
                c = codes[i];
                if ( ships_coord[c] || ships_area[c] ) {
                    return false;
                }
            }
            return true;
        };

        var get_ship_matrix = function (base, type) {
            var hash = [],
                axle,
                l = type-1,
                j;

            if (in_range(base.x + l)) {
                axle = [];
                j = l;
                while (j > -1) {
                    axle.push(self.getXYCode(base.x + j, base.y));
                    j--;
                }
                hash.push(axle);
            }

            if (in_range(base.y + l)) {
                axle = [],
                    j = l;
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

        var add_codes = function (codes) {
            _.each(codes, function (c) {
                ships_coord[c] = 1;
            });
            var area = get_ship_area(codes);
            _.each(area, function (a) {
                ships_area[a] = 1;
            });
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

        this.getCodeXY = function (code) {
            var x = code % 10,
                y = Math.floor(code / 10);
            return {x:x, y:y};
        };

        this.getXYCode = function (x,y) {
            return y*10+x;
            //return ROWS[y] + COLS[x];
        };

        this.getRandomCell = function () {
            var x = _.random(0,9),
                y = _.random(0,9);
            return {
                x: x,
                y: y,
                code: y*10+x
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

            add_codes(codes);

            return codes;
        };
    });
});