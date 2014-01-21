var async = require('async'),
    logger = require('../lib/logger'),
  mongoose = require('mongoose');

var db = {};

var models = ['user', 'item'];

function ensureIndexes(done) {
  return async.each(models, function(model, cb) {
    logger.info('checking indexes for ' + model + '...');
    var m = require('./' + model);
    return m.ensureIndexes(cb);
  }, done);
}

db.connect = function(name, done) {
  logger.info('opening database ' + name + '...');

  mongoose.connect('mongodb://localhost/' + name);
  db.connection = mongoose.connection;

  db.connection.on('error', done);
  db.connection.once('open', function() {
    return ensureIndexes(done);
  });
};

db.close = function(done) {
  logger.info('closing database...');
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
