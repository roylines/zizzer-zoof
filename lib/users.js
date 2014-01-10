var async = require('async'),
  logger = require('./logger'),
  User = require('../models/user');

var users = {};

users.add = function(req, res) {
  var user = new User(req.body);
  user.save(function(e, u) {
    if(e) {
      logger.warn('users.add', e);
      return res.send(400, 'email already exists');
    }
    req.session.user_id = u._id;
    return res.send(200);
  });
};

module.exports = users;
