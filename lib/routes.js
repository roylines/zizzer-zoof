var auth = require('./auth'),
  async = require('async'),
  db = require('../models/db'),
  express = require('express'),
  items = require('./items'),
  logger = require('./logger'),
  users = require('./users'),
  utils = require('./utils');

var routes = {};

routes.listen = function(app, port, done) {
  app.use(express.static(__dirname + '/../static'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: process.env.EXPRESS_SESSION_SECRET
  }));
  app.use(logger.middleware);
  app.use(express.json());
  app.use(utils.middleware);
  app.locals({
    title: 'Zizzer-Zoof',
    tagline: 'which nobody wants because nobody needs'
  });

  return async.series([
    db.connect,
    function(cb) {
      return routes.bind(app, cb);
    },
    function(cb) {
      return app.listen(port, cb);
    },
    function(cb) {
      logger.info('listening on: ' + port);
    }
  ], done);
};

function index(req, res) {
  return res.render('index.ejs');
}

function partial(req, res) {
  return res.render('partial/' + req.params.page + ".ejs", {
    GOOGLE_API_KEY: process.env.ZZ_GOOGLE_API_KEY
  });
}

routes.bind = function(app, done) {
  app.get('/', index);
  app.get('/:any', index);
  app.get('/partial/:page', partial);

  app.post('/api/1/login', auth.login);
  app.get('/api/1/logout', auth.logout);

  app.get('/api/1/items', auth.check, items.all);
  app.post('/api/1/items', auth.check, items.add);

  app.post('/api/1/users', users.add);
  return done();
};

module.exports = routes;
