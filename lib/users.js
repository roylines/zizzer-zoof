var async = require('async'),
  pw = require('credential'),
  User = require('../models/user');

var users = {};

users.add = function(req, res) {
  var user = new User(req.body);
  return user.save(res.send200Or500('users.add'));
};

module.exports = users;
