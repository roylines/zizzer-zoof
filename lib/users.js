var async = require('async'),
  pw = require('credential'),
  User = require('../models/user');

var users = {};

users.add = function(req, res) {
  var user = new User(req.body);
  async.waterfall([
    function(cb) {
      return user.save(cb);
    },
    function(u, cb) {
      req.session.user_id = u._id;
      return cb();
    }
  ], res.send200Or500('users.add'));
};

module.exports = users;
