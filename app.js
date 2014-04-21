var async = require('async'),
  config = require('./lib/config'),
  express = require('express'),
  logger = require('./lib/logger'),
  minimist = require('minimist'),
  routes = require('./lib/routes');

var argv = require('minimist')(process.argv.slice(2));
config.init(argv);

var app = express();
routes.listen(app, function(e) {
  if (e) {
    logger.error(e);
    process.exit(1);
  }

  if (process.send) {
    process.send('online');
  }

  process.on('message', function(message) {
    if (message === 'shutdown') {
      routes.close();
      process.exit(0);
    }
  });
});
