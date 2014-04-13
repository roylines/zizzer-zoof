var async = require('async'),
  express = require('express'),
  logger = require('./lib/logger'),
  routes = require('./lib/routes');

var app = express();
routes.listen(app, function(e) {
  if (e) {
    logger.error(e);
    process.exit(1);
  }

  if(process.send) {
    process.send('online');
  }

  process.on('message', function(message) {
    if(message === 'shutdown') {
      routes.close();
      process.exit(0);
    }
  });
});
