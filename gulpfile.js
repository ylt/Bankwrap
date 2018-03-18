
var gulp = require("gulp");
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var babel = require("gulp-babel");


gulp.task("default", ['scripts']);

gulp.task("scripts", function () {
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
});


gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/**/*.js', ['scripts']);
});


gulp.task("clean", function () {
    return del([
        'dist/'
    ]);
});