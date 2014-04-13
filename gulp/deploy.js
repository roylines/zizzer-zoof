var deploy = {},
  gulp = require('gulp');

var version = new Date().getTime();
var packaged = 'packaged/' + version;

deploy.package = function(dir) {
  return function() {
    return gulp.src(dir + '/**/*')
      .pipe(gulp.dest(packaged + '/' + dir));
  };
};

deploy.packageRoot = function() {
  var src = [
      'package.json',
      'app.js',
  ];
  return gulp.src(src)
    .pipe(gulp.dest(packaged));
};

gulp.task('deploy-package-statics', deploy.package('static'));
gulp.task('deploy-package-views', deploy.package('views'));
gulp.task('deploy-package-models', deploy.package('models'));
gulp.task('deploy-package-lib', deploy.package('lib'));
gulp.task('deploy-package-root', deploy.packageRoot);
gulp.task('deploy-package', ['deploy-package-root', 'deploy-package-statics', 'deploy-package-views', 'deploy-package-models', 'deploy-package-lib']);
gulp.task('deploy-all', ['deploy-package']);

module.exports = deploy;
