var sell = require('./sell');

function index(req, res) {
  return res.render('index.ejs');
}

function partial(req, res) {
  return res.render('partial/' + req.params.page + ".ejs");
}

function selling(req, res) {
  var data = [];
  for (var i = 0; i < 20; ++i) {
    var item = {
      img: "http://thumbs1.ebaystatic.com/d/l225/m/mz7rD-Y7rS1jw3R0zGtI6_A.jpg",
      desc: "some description",
      price: "£10.00",
      expires: new Date().getTime()
    };
    data.push(item);
  }
  res.send(data);
}

var routes = {};
routes.bind = function(app, done) {
  app.get('/', index);
  app.get('/:any', index);
  app.get('/partial/:page', partial);

  app.get('/api/1/items', selling);

  app.post('/api/1/items', sell);
  return done();
};

module.exports = routes;
