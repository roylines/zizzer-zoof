var auth = require('./auth'),
  items = require('./items'),
  users = require('./users');

function index(req, res) {
  return res.render('index.ejs');
}

function partial(req, res) {
  return res.render('partial/' + req.params.page + ".ejs");
}

var routes = {};

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
