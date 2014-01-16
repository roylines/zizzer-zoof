var async = require('async'),
  express = require('express'),
  logger = require('./lib/logger'),
  routes = require('./lib/routes');

var port = 8000;
var app = express();
routes.listen(app, port, function(e) {
  if (e) {
    logger.error(e);
    process.exit(1);
  }
});
