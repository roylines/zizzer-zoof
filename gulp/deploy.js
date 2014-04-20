var deploy = {},
  exec = require('gulp-exec'),
  gulp = require('gulp');

var version = new Date().getTime();
var packaged = 'packaged/' + version;
var remote = '/home/nodeuser/projects';
var remoteCurrent = remote + '/current';
var remotePackaged = remote + '/' + version;
var ip = process.env.ZZ_REMOTE;

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

deploy.scp = function() {
  var ssh = function(user, commands) {
    var cmd = 'ssh ' + user + '@' + ip + ' \'' + commands + '\'';
    console.log(cmd);
    return cmd;
  };

  var scp = function(user, source, target, done) {
    var cmd = 'scp -Cr ' + source + ' ' + user + '@' + ip + ':' + target;
    console.log(cmd);
    return cmd;
  };

  var naughtStart = ";authbind --deep naught start current/app.js --domain=" + process.env.ZZ_REMOTE + " --port=80 --secret=" + process.env.ZZ_EXPRESS_SESSION_SECRET + " --google-client=" + process.env.ZZ_GOOGLE_CLIENT_ID + " --google-secret=" + process.env.ZZ_GOOGLE_CLIENT_SECRET + " --google-api=" + process.env.ZZ_GOOGLE_API_KEY;

  return gulp.src('')
    .pipe(exec(scp('nodeuser', packaged, remotePackaged)))
    .pipe(exec(ssh('nodeuser', 'set -e; cd ' + remotePackaged + ';npm install --production')))
    .pipe(exec(ssh('nodeuser', 'set -e; ln -s ' + remotePackaged + ' ' + remoteCurrent)))
    .pipe(exec(ssh('nodeuser', 'set -e; cd ' + remote + naughtStart + ';naught deploy')));
};

gulp.task('deploy-package-statics', deploy.package('static'));
gulp.task('deploy-package-views', deploy.package('views'));
gulp.task('deploy-package-models', deploy.package('models'));
gulp.task('deploy-package-lib', deploy.package('lib'));
gulp.task('deploy-package-root', deploy.packageRoot);
gulp.task('deploy-package', ['deploy-package-root', 'deploy-package-statics', 'deploy-package-views', 'deploy-package-models', 'deploy-package-lib']);
gulp.task('deploy-scp', ['deploy-package'], deploy.scp);

gulp.task('deploy-all', ['deploy-scp']);

module.exports = deploy;
