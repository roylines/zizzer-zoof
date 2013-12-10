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
  User.findByEmailAndPassword(req.body.email, req.body.password, function(e, id) {
    if(e) {
      return res.send(400, 'Invalid username or password');
    }
    req.session.user_id = id;
    return res.send();
  });
};

auth.logout = function(req, res) {
  delete req.session.user_id;
  return res.send(200);
};

module.exports = auth;
