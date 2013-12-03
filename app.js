var async = require('async'),
  db = require('./models/db'),
  express = require('express'),
  routes = require('./lib/routes'),
  utils = require('./lib/utils');

var port = 8080;
var app = null;

function send(status, done) {
  if(process.send) {
    process.send(status);
  }
  return done();
}

function start() {
  app = express();
  app.use(express.static(__dirname + '/static'));
  app.use(express.static(__dirname + '/db/all'));
  app.use(express.logger());
  app.use(express.json());
  app.use(utils.middleware);
  app.locals({
    title: 'Zizzer-Zoof',
    tagline: 'which nobody wants because nobody needs'
  });

  async.series([
    db.connect,
    function(cb) {
      return routes.bind(app, cb);
    },
    function(cb) {
      return app.listen(port, cb);
    },
    function(cb) {
      console.log('listening on: ' + port);
      return send('online', cb);
    }
  ], function(e) {
    if (e) {
      console.error(e);
      process.exit(1);
    }
  });

  process.on('message', function(message) {
    if (message === 'shutdown') {
      process.exit(0);
    }
  });
}

start();
