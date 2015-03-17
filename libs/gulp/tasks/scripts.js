'use strict';
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

gulp.task('build:js', function() {
    gulp.src('./public/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(rename('bs.js'))
        .pipe(gulp.dest('./public/js'));
});