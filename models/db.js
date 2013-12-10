var async = require('async'),
  mongoose = require('mongoose');

//mongoose.set('debug', true);

var db = {};

var models = ['user', 'item'];

function ensureIndexes(done) {
  return async.each(models, function(model, cb) {
    var m = require('./' + model);
    return m.ensureIndexes(cb);
  }, done);
}

db.connect = function() {
  var name = arguments.length > 1 ? arguments[0] : 'zz';
  var done = arguments[arguments.length - 1];

  mongoose.connect('mongodb://localhost/' + name);
  db.connection = mongoose.connection;

  db.connection.on('error', done);
  db.connection.once('open', function() {
    return ensureIndexes(done);
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
