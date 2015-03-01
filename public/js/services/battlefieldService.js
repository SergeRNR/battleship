define([
    './module',
    'underscore'
], function (services, _) {
    'use strict';
    services.service('BattlefieldService', function () {
        var ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
            COLS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            fields = [],
            $sea = document.querySelector('.container'),
            size = 400; // to be calculated

        var setSizes_ = function (el) {
            el.style.height = el.style.width = size+'px';
        };

        this.getCoords = function (e) {
            var props = e.target.getBoundingClientRect(),
                cursor_correction = 14,
                x = e.x - props.left + cursor_correction,
                y = e.y - props.top + cursor_correction;

            x = Math.floor(x / ( (props.width-2) / 10));
            y = Math.floor(y / ( (props.height-2) / 10));

            return ROWS[y] + COLS[x];
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

        var Field = function () {
            this.$el = document.createElement('div');
            this.$el.className = 'battlefield';
            this.$el.addEventListener('click', function (e) {
                console.log(getCoords(e));
                //testRandom();
            });
        };

        Field.prototype.render = function () {
            setSizes_(this.$el);
            $sea.appendChild(this.$el);
        };
    });
});