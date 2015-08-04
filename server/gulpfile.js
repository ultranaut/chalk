'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var lint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

var srcJS = './src/foo.js';

// Tasks
// ---------------------------------------------------------
gulp.task('clean', function () {
  del(['./foo.js']);
});

gulp.task('lint', function () {
  return gulp.src(srcJS)
    .pipe(plumber())
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failOnError());
});

gulp.task('build', ['clean', 'lint'], function () {
  return gulp.src(srcJS)
    .pipe(plumber())
    .pipe(babel())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch(srcJS, ['lint']);
});

// default task
// -----------------------------------------------
gulp.task('default', ['clean', 'lint', 'watch']);
