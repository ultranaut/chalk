/*eslint-env node */
'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var lint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var react = require('gulp-react');
var sass = require('gulp-sass');

var paths = {
  src: './src',
  js: './src/js/**/*.js',
  jsx: './src/js/jsx/**/*.js',
  css: './src/css',
  sass: './src/css/sass/*.scss'
};
var options = {
  sass: {
    outputStyle: 'compressed'
  }
};

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(gulp.dest(paths.css));
});

gulp.task('connect', function () {
  connect.server({
    root: paths.src,
    port: 8000,
    livereload: true
  });
});

gulp.task('js', function () {
  gulp.src([paths.js, '!./src/js/app.js'])
    .pipe(plumber())
    .pipe(lint())
    .pipe(lint.formatEach())
    .pipe(connect.reload());
});

gulp.task('react', function () {
  return gulp.src(paths.jsx)
    .pipe(plumber())
    .pipe(react())
    .pipe(gulp.dest('./src/js'))
    .pipe(connect.reload());
});

gulp.task('css', ['sass'], function () {
  return gulp.src(paths.css)
    .pipe(plumber())
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch([paths.js], ['js']);
  gulp.watch([paths.jsx], ['react']);
  gulp.watch([paths.css], ['css']);
  gulp.watch([paths.sass], ['sass']);
});

gulp.task('default', ['connect', 'css', 'react', 'js', 'watch']);
