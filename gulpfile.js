'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');

//清理目录
gulp.task('clean', function() {
  return gulp.src([
      './assets/css'
    ], {read: false})
    .pipe(clean());
});

gulp.task('less', function() {
  return gulp.src([
      './assets/less/*.less'
    ])
    .pipe(less())
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function(){
  gulp.watch('./assets/**/*.less', ['less']);
});

gulp.task('default', ['clean'], function() {
  return gulp.start('less');
});

