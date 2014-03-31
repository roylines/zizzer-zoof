var gulp = require('gulp'),
  tasks = require('require-all')(__dirname + '/gulp');

gulp.task('default', ['angular', 'server']);
gulp.task('test', ['server-lint', 'server-test']);
gulp.task('watch', ['client-watch']);
