var assert = require('assert'),
    db = require('../models/db.js'),
    mongoose = require('mongoose');

describe('db', function() {
  afterEach(function(done) {
    mongoose.connections[0].close(done);
  });
  describe('connect', function() {
    it('should connect to default database', function(done) {
      return db.connect(function(e) {
        assert.equal(mongoose.connections.length, 1);
        assert.equal(mongoose.connections[0].name, 'zz');
        return done(e);
      });
    });
    it('should connect to named database', function(done) {
      return db.connect('test', function(e) {
        assert.equal(mongoose.connections.length, 1);
        assert.equal(mongoose.connections[0].name, 'test');
        return done(e);
      });
    });
  });
});
