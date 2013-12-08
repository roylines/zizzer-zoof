var mongoose = require('mongoose');

var db = {};

db.connect = function() {
  var name = arguments.length > 1 ? arguments[0] : 'zz';
  var done = arguments[arguments.length - 1];

  mongoose.connect('mongodb://localhost/' + name);
  var db = mongoose.connection;

  db.on('error', function(e) {
    return done(e);
  });
  db.once('open', function() {
    return done();
  });
};

module.exports = db;
