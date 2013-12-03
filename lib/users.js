var _ = require('underscore'),
  User = require('../models/user');

var users = {};

users.add = function(req, res) {
  var user = new User(_.pick(req.body, 'email', 'geo'));
  return user.save(res.send200Or500('users.add'));
};

module.exports = users;
