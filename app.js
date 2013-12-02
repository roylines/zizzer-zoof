var async = require('async'),
  db = require('./models/db'),
  express = require('express'),
  routes = require('./lib/routes'),
  app = express();

var port = 8080;

app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/db/all'));
app.use(express.logger());
app.locals({
  title: 'Zizzer-Zoof',
  tagline: 'which nobody wants because nobody needs'
});

async.series([
  db.connect,
  function(cb) {
    return routes.bind(app, cb);
  },
  function(cb) {
    return app.listen(port, cb);
  }
], function(e) {
  if (e) {
    console.error(e);
    process.exit(1);
  }
  console.log('listening on: ' + port);
});
