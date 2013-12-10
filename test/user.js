var assert = require('assert'),
  db = require('../models/db'),
  User = require('../models/user.js');

describe('user', function() {
  before(function(done) {
    return db.connect('test', function(e) {
      if (e) {
        return done(e);
      }
      setTimeout(done, 1000);
    });
  });

  after(db.close);

  it('can add a user', function(done) {
    var user = new User({
      email: 'mocha@mocha.com',
      password: 'PASSWORD',
      geo: [1, 2]
    });
    return user.save(done);
  });
  it('cannot add the same user twice', function(done) {
    var user = new User({
      email: 'mocha@mocha.com',
      password: 'PASSWORD2',
      geo: [3, 4]
    });
    return user.save(function(e) {
      assert.equal(e.code, 11000);
      return done();
    });
  });
  it('can remove a user', function(done) {
    return User.remove({
      email: 'mocha@mocha.com'
    }, done);
  });
});
