var assert = require('assert'),
  db = require('../models/db'),
  user = require('../models/user.js');

describe('models', function() {
  before(function(done) {
    return db.connect('test', done);
  });

  after(db.close);

  describe('user', function() {
    it('should connect to default database', function(done) {
      return done();
    });
  });
});
