var User = require('../models/user'),
  logger = require('./logger'),
  _ = require('lodash'),
  async = require('async');

var users = {};

users.me = function(req, res) {
  if (!req.isAuthenticated()) {
    return res.json({});
  }

  return res.json(_.pick(req.user, ['givenName', 'familyName', 'geo']));
};

module.exports = users;
