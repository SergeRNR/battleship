'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('../config').css;

gulp.task('build:css', function () {
    return gulp.src('./public/sass/*.scss')
        .pipe(sass({errLogToConsole: config.errorLogToConsole}))
        .pipe(autoprefixer(config.autoprefixer.browsers))
        .pipe(gulp.dest('./public/assets'));
});

gulp.task('watch', function () {
    gulp.watch('./public/sass/*.scss', ['build:css']);
});
