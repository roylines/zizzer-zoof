var server = {},
  gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  plumber = require('gulp-plumber'),
  jshint = require('gulp-jshint');

var src = [
    '*.js',
    '*/*.js'
];

server.lint = function() {
  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
};

server.test = function() {
  var config = {
    reporter: 'spec'
  };

  return gulp.src('test/*-test.js')
    .pipe(plumber())
    .pipe(mocha(config));
};

gulp.task('server-lint', server.lint);
gulp.task('server-test', server.test);
gulp.task('server', ['server-lint', 'server-test']);

module.exports = server;
