var async = require('async'),
  db = require('../models/db'),
  Item = require('../models/item.js'),
  User = require('../models/user.js');

var utils = {
  db: {}
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
