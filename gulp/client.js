var client = {},
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify');

var src = [
    'angular/head/*.js',
    'angular/services/*.js',
    'angular/directives/*.js',
    'angular/controllers/*.js',
    'angular/tail/*.js'
];

client.sass = function() {
  return gulp.src('./sass/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./static/css'));
};

client.minifyCss = function() {
  return gulp.src('./static/css/styles.css')
    .pipe(minifyCss())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./static/css'));
};

client.lint = function() {
  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
};

client.concat = function() {
  return gulp.src(src)
    .pipe(concat('zz.js'))
    .pipe(gulp.dest('./static/js'));
};

client.uglify = function() {
  return gulp.src('./static/js/zz.js')
    .pipe(uglify())
    .pipe(rename('zz.min.js'))
    .pipe(gulp.dest('./static/js'));
};

gulp.task('client-lint', client.lint);
gulp.task('client-sass', client.sass);
gulp.task('client-minify-css', ['client-sass'], client.minifyCss);
gulp.task('client-concat', client.concat);
gulp.task('client-uglify', ['client-concat'], client.uglify);
gulp.task('client', ['client-lint', 'client-uglify', 'client-minify-css']);

gulp.task('client-watch', ['client'], function() {
  gulp.watch(src, ['client-lint', 'client-uglify']);
  gulp.watch('./sass/*.scss', ['client-minify-css']);
});


module.exports = client;
