var express = require('express');

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
  var post = req.body;
  if (post.user == 'test' && post.password == 'test') {
    req.session.user_id = 1;
    res.send(200);
  } else {
    res.send(400, 'failed to login');
  }
};

auth.logout = function(req, res) {
  delete req.session.user_id;
  return res.send(200);
};

module.exports = auth;
