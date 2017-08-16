
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var merge = require('merge2');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

gulp.task("default", ['scripts']);

gulp.task("scripts", function () {
    var tsResult = gulp
        .src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist'))
    ]);
});


gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
});


gulp.task("clean", function () {
    return del([
        'dist/'
    ]);
});