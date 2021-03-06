var async = require('async'),
  auth = require('./auth'),
  config = require('./config'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  db = require('../models/db'),
  express = require('express'),
  fs = require('fs'),
  items = require('./items'),
  logger = require('./logger'),
  passport = require('passport'),
  path = require('path'),
  session = require('express-session'),
  users = require('./users'),
  utils = require('./utils');

var Store = require("connect-mongo")({session: session});

var routes = {};

routes.configure = function(app) {
  app._store = new Store({
    db: config.mongoDbName
  });

  app.set('views', __dirname + '/../views');
  app.use(express.static(__dirname + '/../static'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(session({
    secret: config.sessionSecret,
    store: app._store
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(logger.middleware);
  app.use(utils.middleware);
  app.locals.title = 'Zizzer-Zoof';
  app.locals.tagline = 'which nobody wants because nobody needs';
};

routes.listen = function(app, done) {
  routes.configure(app);
  var connect = function(cb) {
    logger.info('connecting to ' + config.mongoDbName + '...');
    return db.connect(config.mongoDbName, cb);
  };

  var configureAuth = function(cb) {
    logger.info('configuring authentication...');
    auth.configure(app, passport);
    return cb();
  };

  var bind = function(cb) {
    logger.info('binding routes...');
    return routes.bind(app, cb);
  };

  var start = function(cb) {
    logger.info('starting app on port ' + config.port);
    routes.app = app.listen(config.port, cb);
  };

  var complete = function(cb) {
    logger.info('ready.');
    return cb();
  };

  return async.series([connect, configureAuth, bind, start, complete], done);
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
      GOOGLE_API_KEY: config.googleApiKey
    });
  };

  console.log('partial: isAuthenticated', req.isAuthenticated());

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

  app.get('/logout', auth.logout);

  app.get('/api/1/users/me', users.me);
  app.get('/api/1/items', auth.check, items.all);
  app.post('/api/1/items', auth.check, items.add);
  return done();
};

module.exports = routes;
