var async = require('async'),
  mongoose = require('mongoose');

var db = {};

db.connect = function() {
  var name = arguments.length > 1 ? arguments[0] : 'zz';
  var done = arguments[arguments.length - 1];

  console.log('connecting to ' + name);

  mongoose.connect('mongodb://localhost/' + name);
  db.connection = mongoose.connection;

  db.connection.on('error', done);
  db.connection.once('open', function() {
    return done();
  });
};

db.close = function(done) {
  if (db.connection) {
    db.connection.close(function(e) {
      delete db.connection;
      return done(e);
    });
  } else {
    return done();
  }
};

db.name = function() {
  if (db.connection) {
    return db.connection.name;
  }

  return null;
};

module.exports = db;
