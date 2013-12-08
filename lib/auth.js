var async = require('async'),
  express = require('express'),
  pw = require('credential'),
  utils = require('./utils'),
  User = require('../models/user');

var auth = {};

//http://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js/8003291#8003291
auth.check = function(req, res, next) {
  if (!req.session.user_id) {
    return res.send(401);
  } else {
    return next();
  }
};

auth.login = function(req, res) {
  console.log('login', req.body);
  var id = null;
  async.waterfall([
    function(cb) {
      return User.findOne({
        email: req.body.email
      }, '_id, hash', cb);
    },
    function(u, cb) {
      console.log('XXX', u);
      if (u === null) {
        return cb('wrong user');
      }
      id = u._id;
      return pw.verify(u.hash, req.body.password, cb);
    },
    function(valid, cb) {
      if (!valid) {
        return cb('wrong password');
      }
      req.session.user_id = id;
      return cb();
    }
  ], res.send200OrStatusCode(400, 'auth.login', 'Invalid username or password'));
};

auth.logout = function(req, res) {
  delete req.session.user_id;
  return res.send(200);
};

module.exports = auth;
