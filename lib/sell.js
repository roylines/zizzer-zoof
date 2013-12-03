var async = require('async'),
  formidable = require('formidable'),
  fs = require('fs'),
  gm = require('gm');

var zzdb = __dirname + '/../db';
var zzall = zzdb + '/all';
var zznew = zzdb + '/new';

function mkdir(path, done) {
  fs.mkdir(path, 0777, function(e) {
    if (e && e.code === 'EEXIST') {
      return done();
    }

    return done(e);
  });
}

function prepare(done) {
  return async.series([
    function(cb) {
      return mkdir(zzdb, cb);
    },
    function(cb) {
      return mkdir(zzall, cb);
    },
    function(cb) {
      return mkdir(zznew, cb);
    }
  ], done);
}

function upload(req, done) {
  var form = new formidable.IncomingForm();
  form.uploadDir = zznew;
  form.hash = 'md5';
  return form.parse(req, done);
}

function sell(req, res, next) {
  var image = null;

  async.waterfall([
    prepare,
    function(cb) {
      return upload(req, cb);
    },
    function(fields, files, cb) {
      image = files.image;
      return cb();
    },
    function(cb) {
      return gm(image.path).resize(225, 300).noProfile().write(zzall + '/' + image.hash + '.jpg', cb);
    },
    function(a, b, c, cb) {
      return fs.unlink(image.path, cb);
    }
  ], res.send200Or500('sell'));
}

module.exports = sell;
