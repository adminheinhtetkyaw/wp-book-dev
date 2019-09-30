var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var copy = require('gulp-copy');
var minify = require('gulp-minify');
var wpPot = require('gulp-wp-pot');
var watch = require('gulp-watch');
var clean = require('gulp-clean');

gulp.task('css', function(){
  return gulp.src('assets/css/src/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('assets/css'))
});

gulp.task('js', function(){
  return gulp.src('assets/js/src/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('wpbook.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/js'))
});

gulp.task('pot', function(){
  return gulp.src('src/**/*.php')
    .pipe(wpPot( {
        domain: 'wp-book'
    } ))
    .pipe(gulp.dest('languages/wp-book.pot'));
});

var destination = 'assets/css/';

gulp.task('copycss', function(){
  return gulp.src(['node_modules/select2/dist/css/select2.min.css', 'node_modules/jquery-ui/themes/base/accordion.css', 'node_modules/jquery-ui/themes/base/sortable.css'])
    .pipe(copy('assets/css/'));
});

gulp.task('copyjs', function(){
  return gulp.src(['node_modules/select2/dist/js/select2.min.js'])
    .pipe(copy('assets/js/'));
});

gulp.task('watch', function () {
    return watch('assets/css/src/*.less', function () {
        return gulp.src('assets/css/src/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'))
    });
});

gulp.task('clean', function () {
    return gulp.src('node_modules', {read: false})
        .pipe(clean());
});

gulp.task('default', [ 'css', 'js' ]);
gulp.task('dist', [ 'css', 'js', 'copycss', 'copyjs', 'pot' ]);