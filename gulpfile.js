var gulp = require('gulp'),
  angular = require('./gulp/angular.js'),
  css = require('./gulp/css.js'),
  server = require('./gulp/server.js'),
  thirdparty = require('./gulp/thirdparty.js');

gulp.task('server-lint', server.lint);
gulp.task('server-test', server.test);
gulp.task('server', ['server-lint']);//, 'server-test']);

gulp.task('angular-lint', angular.lint);
gulp.task('angular-concat', angular.concat);
gulp.task('angular-uglify', ['angular-concat'], angular.uglify);
gulp.task('angular', ['angular-lint', 'angular-uglify']);

gulp.task('css-sass', css.sass);
gulp.task('css', ['css-sass']);

gulp.task('thirdparty-concat', thirdparty.concat);
gulp.task('thirdparty-uglify', ['thirdparty-concat'], thirdparty.uglify);
gulp.task('thirdparty-icons-css', thirdparty.iconsCSS);
gulp.task('thirdparty-icons-svg', thirdparty.iconsSVG);
gulp.task('thirdparty', ['thirdparty-uglify', 'thirdparty-icons-css', 'thirdparty-icons-svg']);
  
gulp.task('default', ['angular', 'css', 'server']);
gulp.task('test', ['server-lint', 'server-test']);
