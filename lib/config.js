var _ = require('lodash'),
  logger = require('./logger');

var config = {};

var defaults = {
  development: false,
  protocol: "http",
  hostname: "localhost",
  port: 8000,
  sessionSecret: "shhhdonottellanyonethisitwaskeysersoze",
  mongoDbName: "zz",
  googleApiKey: "none",
  googleClientId: "none",
  googleClientSecret: "none"
};

config.init = function(c) {
  logger.info('config.init');
  _.assign(config, c);
  _.defaults(config, defaults);
  config.url = config.protocol + '://' + config.hostname + (+config.port === 80 ? '' : ':' + config.port);
};

module.exports = config;
