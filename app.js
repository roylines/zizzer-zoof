var async = require('async'),
  db = require('./models/db'),
  formidable = require('formidable'),
  fs = require('fs'),
  gm = require('gm'),
  express = require('express'),
  util = require('util');

function status200or500(res, e) {
  if(e) {
    return res.send(500);
  }
  return res.send();
}

function route(app) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.post('/', function(req, res, next) {

    var zzdb = '/zzdb';
    var image = null;

    async.waterfall([
      function(cb) {
        var form = new formidable.IncomingForm();
        form.uploadDir = zzdb + '/new';
        form.hash = 'md5';
        return form.parse(req, cb);
      },
      function(fields, files, cb) {
        image = files.image;
        return cb();
      },
      function(cb) {
        return gm(image.path).noProfile().write(zzdb + '/all/' + image.hash + '.jpg', cb);
      }//,
      //function(cb) {
      //  return fs.unlink(image.path, cb);
      //}
    ], function(e) {
      return status200or500(res, e);
    });
  });
}

function start(app) {
  db.connect(function(e) {
    if (e) {
      console.error('failed to connect to database', e);
      process.exit(1);
    }

    route(app);

    app.listen(3000, function() {
      console.log('listening...');
    });
  });
}

var app = express();

start(app);
