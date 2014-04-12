var async = require('async'),
  config = require('./config'),
  logger = require('./logger'),
  pw = require('credential'),
  utils = require('./utils'),
  User = require('../models/user'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var auth = {};

auth.configure = function(app, passport) {

  passport.serializeUser(function(user, done) {
    logger.info('serialize user', JSON.stringify(user._id));
    return done(null, user._id);
  });

  passport.deserializeUser(function(_id, done) {
    logger.info('deserialize user', _id);
    return User.findById(_id, done);
  });

  var verification = function(token, refresh, profile, done) {

    var profileId = [profile.provider, profile.id].join(':');
    logger.info('verification', profileId);

    var findOne = function(cb) {
      return User.findOne({
        profileId: profileId
      }, cb);
    };

    var update = function(user, cb) {
      if (!user) {
        logger.info('verification: new user', profileId);
        user = new User({
          profileId: profileId
        });
      }

      user.email = profile.emails[0].value;
      user.givenName = profile.name.givenName;
      user.familyName = profile.name.familyName;

      return user.save(function(e) {
        return cb(e, user);
      });
    };

    return async.waterfall([findOne, update], done);
  };

  passport.use(new GoogleStrategy(config.google, verification));

  app.get('/auth/google',
    passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/'
  }));
};

auth.check = function(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
};

auth.logout = function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};

module.exports = auth;
