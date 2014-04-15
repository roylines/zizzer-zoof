var async = require('async'),
  db = require('../models/db'),
  logger = require('../lib/logger'),
  sinon = require('sinon'),
  Item = require('../models/item'),
  User = require('../models/user');

var utils = {
  db: {},
  logger: {}
};

utils.logger.stub = function() {
  sinon.stub(logger, 'info');
  sinon.stub(logger, 'warn');
  sinon.stub(logger, 'error');
};

utils.logger.restore = function() {
  logger.info.restore();
  logger.warn.restore();
  logger.error.restore();
};

utils.db.connect = function(done) {
  return db.connect('test', function(e) {
    if (e) {
      return done(e);
    }
    return setTimeout(done, 1000);
  });
};

utils.db.clear = function(done) {
  return async.series([
    function(cb) {
      return Item.remove({}, cb);
    },
    function(cb) {
      return User.remove({}, cb);
    },
    function(cb) {
      return db.close(cb);
    }
  ], done);
};


module.exports = utils;
