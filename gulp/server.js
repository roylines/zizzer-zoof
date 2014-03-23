var server = {},
  gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  jshint = require('gulp-jshint');

var src = [
    '*.js',
    '*/*.js'
];

server.lint = function() {
  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
};

server.test = function() {
  return gulp.src('test/*.js')
    .pipe(mocha({
    ui: 'bdd'
  }));
};

module.exports = server;
