var gulp = require('gulp'),
  tasks = require('require-all')(__dirname + '/gulp');

gulp.task('deploy', ['deploy-all']);
gulp.task('default', ['client', 'server']);
gulp.task('test', ['server-lint', 'server-test']);
gulp.task('watch', ['client-watch']);
