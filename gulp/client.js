var client = {},
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
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
gulp.task('client-concat', client.concat);
gulp.task('client-uglify', ['client-concat'], client.uglify);
gulp.task('client', ['client-lint', 'client-uglify', 'client-sass']);

gulp.task('client-watch', ['client'], function() {
  gulp.watch(src, ['client-lint', 'client-uglify']);
  gulp.watch('./sass/styles.scss', ['client-sass']);
});


module.exports = client;
