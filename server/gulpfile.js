'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var lint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

var config = {
  src: './src/server.js'
};

// Tasks
// ---------------------------------------------------------
gulp.task('clean', function () {
  del(['./dist']);
});

gulp.task('lint', function () {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failOnError());
});

gulp.task('build', ['clean', 'lint'], function () {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(babel())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch(config.src, ['lint']);
});

// default task
// -----------------------------------------------
gulp.task('default', ['clean', 'lint', 'watch']);
