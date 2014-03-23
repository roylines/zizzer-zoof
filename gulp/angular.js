var angular = {},
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

var src = [
    'angular/head/*.js',
    'angular/services/*.js',
    'angular/directives/*.js',
    'angular/controllers/*.js',
    'angular/tail/*.js'
];

angular.lint = function() {
  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
};

angular.concat = function() {
  return gulp.src(src)
    .pipe(concat('zz.js'))
    .pipe(gulp.dest('./static/js'));
};

angular.uglify = function() {
  return gulp.src('./static/js/zz.js')
    .pipe(uglify())
    .pipe(rename('zz.min.js'))
    .pipe(gulp.dest('./static/js'));
};

module.exports = angular;
