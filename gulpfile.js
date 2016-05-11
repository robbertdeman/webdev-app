const gulp = require('gulp');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');

gulp.task('scripts', () => {
    var bundler = browserify('./src/script.es6')
        .transform(babelify, {presets: ['es2015']})
        .bundle();

    return bundler
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.*', ['scripts']);
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'scripts']);
