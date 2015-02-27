var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    nodemon = require('gulp-nodemon');

gulp.task('build:css', function () {
    return gulp.src('./public/sass/*.scss')
        .pipe(sass({ errLogToConsole: true }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./public/assets'));
});

gulp.task('watch', function() {
    gulp.watch('./public/sass/*.scss', ['build:css']);
});

gulp.task('server', function () {
    nodemon({
        script: './bin/www',
        env: { 'NODE_ENV': 'development' },
        nodeArgs: ['--debug=5857'],
        ignore: ['./public']
    });
});

gulp.task('default', ['server','watch'], function () {});