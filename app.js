var async = require('async'),
  db = require('./models/db'),
  express = require('express'),
  logger = require('./lib/logger'),
  routes = require('./lib/routes'),
  utils = require('./lib/utils');

var port = 8000;
var app = null;

var start = function() {
  app = express();
  app.use(express.static(__dirname + '/static'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: process.env.EXPRESS_SESSION_SECRET
  }));
  app.use(logger.middleware);
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
    }
  ], function(e) {
    if (e) {
      logger.error(e);
      process.exit(1);
    }
    logger.info('listening on: ' + port);
  });
}

start();
