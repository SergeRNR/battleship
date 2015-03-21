'use strict';
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('./config');

gulp.task('server', function () {
    nodemon({
        script: './bin/www',
        env: { 'NODE_ENV': config.get('server').env },
        nodeArgs: ['--debug=' + config.get('server').debugPort],
        ignore: ['./public']
    });
});

gulp.task('build:js', function() {
    gulp.src('./public/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(rename('bs.js'))
        .pipe(gulp.dest('./public/assets'))
        .pipe(gulp.dest('../bs/public/assets'));
});

gulp.task('build:css', function () {
    return gulp.src('./public/sass/*.scss')
        .pipe(sass({errLogToConsole: config.errorLogToConsole}))
        .pipe(autoprefixer(config.get('autoprefixer').browsers))
        .pipe(gulp.dest('./public/assets'))
        .pipe(gulp.dest('../bs/public/assets'));
});

gulp.task('watch', function () {
    gulp.watch(['./public/js/**/*.js', '!./public/js/bs.js'], ['build:js']);
    gulp.watch('./public/sass/*.scss', ['build:css']);
});

gulp.task('default', ['server', 'watch']);
