'use strict';
var gulp = require('gulp');

gulp.task('watch', function () {
    gulp.watch(['./public/js/**/*.js', '!./public/js/bs.js'], ['build:js']);
    gulp.watch('./public/sass/*.scss', ['build:css']);
});

gulp.task('default', ['server', 'watch']);
