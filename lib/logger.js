var winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { timestamp: true, colorize: true });

var logger = {};

logger.middleware = function(req, res, done) {
  winston.info(req.method, req.url);
  return done();
};

logger.info = winston.info;
logger.warn = winston.warn;
logger.error = winston.error;

module.exports = logger;
