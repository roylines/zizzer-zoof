var assert = require('assert'),
  db = require('../models/db.js'),
  utils = require('./utils');

describe('db ->', function() {
  before(utils.logger.stub);
  beforeEach(db.close);

  afterEach(db.close);
  after(utils.logger.restore);

  describe('connect ->', function() {
    it('should connect to default database', function(done) {
      return db.connect('zz', function(e) {
        assert.equal(db.name(), 'zz');
        return done(e);
      });
    });
    it('should connect to named database', function(done) {
      return db.connect('test', function(e) {
        assert.equal(db.name(), 'test');
        return done(e);
      });
    });
  });

  describe('close ->', function() {
    it('should be ok when no connections open', function(done) {
      assert.equal(db.name(), null);
      return db.close(done);
    });
    it('should close any open connections', function(done) {
      assert.equal(db.name(), null);
      db.connect('zz', function() {
        assert.equal(db.name(), 'zz');
        db.close(function(e) {
          assert.equal(db.name(), null);
          return done(e);
        });
      });
    });
  });
});
