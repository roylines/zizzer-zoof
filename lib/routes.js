var items = require('./items'),
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

  app.get('/api/1/items', items.all);
  app.post('/api/1/items', items.add);

  app.post('/api/1/users', users.add);
  return done();
};

module.exports = routes;
