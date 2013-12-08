var async = require('async'),
  pw = require('credential'),
  User = require('../models/user');

var users = {};

users.add = function(req, res) {
  async.waterfall([
    function(cb) {
      return pw.hash(req.body.password, cb);
    },
    function(hash, cb) {
      var user = new User({
        email: req.body.email,
        hash: hash,
        geo: req.body.geo
      });
      return user.save(res.send200Or500('users.add'));
    }
  ], res.send200Or500('users.add'));
};

module.exports = users;
