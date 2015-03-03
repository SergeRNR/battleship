'use strict';
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    config = require('../config').server;

gulp.task('server', function () {
    nodemon({
        script: './bin/www',
        env: { 'NODE_ENV': config.env },
        nodeArgs: ['--debug=' + config.debugPort],
        ignore: ['./public']
    });
});
