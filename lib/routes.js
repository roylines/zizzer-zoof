var auth = require('./auth'),
  async = require('async'),
  config = require('./config'),
  db = require('../models/db'),
  express = require('express'),
  fs = require('fs'),
  items = require('./items'),
  logger = require('./logger'),
  passport = require('passport'),
  path = require('path'),
  users = require('./users'),
  utils = require('./utils');

var routes = {};

routes.listen = function(app, port, dbname, done) {

  app.use(express.static(__dirname + '/../static'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.sessionSecret
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(logger.middleware);
  app.use(express.json());
  app.use(utils.middleware);
  app.locals({
    title: 'Zizzer-Zoof',
    tagline: 'which nobody wants because nobody needs'
  });

  return async.series([
    function(cb) {
      return db.connect(dbname, cb);
    },
    function(cb) {
      logger.info('configuring authentication...');
      auth.configure(app, passport);
      return cb();
    },
    function(cb) {
      logger.info('binding routes...');
      return routes.bind(app, cb);
    },
    function(cb) {
      logger.info('starting app...');
      routes.app = app.listen(port, cb);
      return;
    },
    function(cb) {
      logger.info('listening on port ' + port);
      return cb();
    }
  ], done);
};

routes.close = function() {
  routes.app.close();
};

function index(req, res) {
  return res.render('index.ejs');
}

function partial(req, res) {

  var viewExists = function(name) {
    var search = __dirname + '/../views/partial/' + name + '.ejs';
    logger.info('partial, searching for', search);
    return fs.existsSync(search);
  };

  var render = function(name) {
    return res.render('partial/' + name + '.ejs', {
      GOOGLE_API_KEY: config.google.apiKey
    });
  };

  if (req.isAuthenticated() && viewExists('secure-' + req.params.page)) {
    logger.info('partial, rendering secure page', req.params.page);
    return render('secure-' + req.params.page);
  }

  if (viewExists(req.params.page)) {
    logger.info('partial, rendering insecure page', req.params.page);
    return render(req.params.page);
  }
  
  logger.info('partial, no matching page, returning 401', req.params.page);

  return res.send(401);
}

routes.bind = function(app, done) {
  app.get('/', index);
  app.get('/:any', index);
  app.get('/partial/:page', partial);

  //  app.post('/api/1/login', auth.login);
  app.get('/api/1/logout', auth.check, auth.logout);

  app.get('/api/1/items', auth.check, items.all);
  app.post('/api/1/items', auth.check, items.add);
  return done();
};

module.exports = routes;
