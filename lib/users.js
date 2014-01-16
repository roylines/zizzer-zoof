var async = require('async'),
  logger = require('./logger'),
  User = require('../models/user');

var users = {};

users.add = function(req, res) {
  logger.info('users.add', { body: req.body });
  var user = new User(req.body);
  user.save(function(e, u) {
    if(!e) {
      req.session.user_id = u._id;
    }
    return res.send200OrStatusCode(400, 'users.add', 'email already exists')(e);
  });
};

module.exports = users;
