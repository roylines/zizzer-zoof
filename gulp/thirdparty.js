var thirdparty = {},
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

var path = '../../thirdparty/';

thirdparty.iconsCSS = function() {
  return gulp.src(path + '/foundation-icons-3/foundation-icons.*')
    .pipe(gulp.dest('./static/css'));
};

thirdparty.iconsSVG = function() {
  return gulp.src(path + '/foundation-icons-3/svgs/*')
    .pipe(gulp.dest('./static/css/svgs'));
};

thirdparty.concat = function() {
  var src = [
    path + '/foundation/js/vendor/jquery.js',
    path + '/foundation/js/vendor/*.js',
    path + '/foundation/js/foundation/foundation.js',
    path + '/angular/angular-1.2.2/angular.js',
    path + '/angular/angular-1.2.2/angular-route.js',
    path + '/angular/angular-1.2.2/angular-resource.js'
  ];

  return gulp.src(src)
    .pipe(concat('thirdparties.js'))
    .pipe(gulp.dest('./static/js'));
};

thirdparty.uglify = function() {
  return gulp.src('./static/js/thirdparties.js')
    .pipe(uglify())
    .pipe(rename('thirdparties.min.js'))
    .pipe(gulp.dest('./static/js'));
};

module.exports = thirdparty;
