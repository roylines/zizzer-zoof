var thirdparty = {},
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

var path = '../../thirdparty';

thirdparty.fonts = function() {
  var src = [
    path + '/semantic/build/packaged/fonts/*',
  ];
  
  return gulp.src(src)
    .pipe(gulp.dest('./static/fonts'));
};

thirdparty.images = function() {
  var src = [
    path + '/semantic/build/packaged/images/*',
  ];
  
  return gulp.src(src)
    .pipe(gulp.dest('./static/images'));
};

thirdparty.css = function() {
  var src = [
    path + '/semantic/build/packaged/css/semantic.css',
  ];
  
  return gulp.src(src)
    .pipe(concat('thirdparties.css'))
    .pipe(gulp.dest('./static/css'));
};

thirdparty.minifyCss = function() {
  return gulp.src('./static/css/thirdparties.css')
    .pipe(minifyCss())
    .pipe(rename('thirdparties.min.css'))
    .pipe(gulp.dest('./static/css'));
};

thirdparty.concat = function() {
  var src = [
    path + '/jquery/jquery-2.1.0.js',
    path + '/semantic/build/packaged/javascript/semantic.js',
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

gulp.task('thirdparty-concat', thirdparty.concat);
gulp.task('thirdparty-uglify', ['thirdparty-concat'], thirdparty.uglify);
gulp.task('thirdparty-css', thirdparty.css);
gulp.task('thirdparty-minify-css', ['thirdparty-css'], thirdparty.minifyCss);
gulp.task('thirdparty-fonts', thirdparty.fonts);
gulp.task('thirdparty-images', thirdparty.images);
gulp.task('thirdparty', ['thirdparty-uglify', 'thirdparty-minify-css', 'thirdparty-fonts', 'thirdparty-images']);

module.exports = thirdparty;
