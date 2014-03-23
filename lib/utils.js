var logger = require('./logger');

var utils = {};

utils.middleware = function(req, res, next) {
  res.send200Or500 = function(msg) {
    return res.send200OrStatusCode(500, msg);
  };

  res.send200OrStatusCode = function(statusCode, log, message) {
    return function(e) {
      if (e) {
        if (log) {
          logger.error(log, 'returning: ' + statusCode, e, message);
        }
        return res.send(statusCode, message);
      }
      return res.send(200);
    };
  };

  res.sendJSONOr500 = function(msg) {
    return function(e, json) {
      if (e) {
        logger.error(msg, e);
        return res.send(500);
      }
      return res.json(json);
    };
  };
  
  res.sendHTMLOrStatusCode = function(msg, statusCode) {
    return function(e, html) {
      if (e) {
        logger.error(msg);
        return res.send(statusCode || 404);
      }
      return res.send(html);
    };
  };

  return next();
};

module.exports = utils;
