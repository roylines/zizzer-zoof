var assert = require('assert'),
  db = require('../models/db'),
  User = require('../models/user.js');

describe('user (model)', function() {
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

  it('findByEmailAndPassword for valid users should return id', function(done) {
    User.findByEmailAndPassword('mocha@mocha.com', 'PASSWORD', function(e, id) {
      assert.equal(e, null);
      assert(id);
      return done();
    });
  });

  it('findByEmailAndPassword for missing email should return error', function(done) {
    User.findByEmailAndPassword(null, 'PASSWORD', function(e, id) {
      assert.equal(e, 'wrong user');
      return done();
    });
  });

  it('findByEmailAndPassword for invalid email should return error', function(done) {
    User.findByEmailAndPassword('missing@missing.com', 'PASSWORD', function(e, id) {
      assert.equal(e, 'wrong user');
      return done();
    });
  });
  
  it('findByEmailAndPassword for invalid password should return error', function(done) {
    User.findByEmailAndPassword('mocha@mocha.com', 'WRONGPASSWORD', function(e, id) {
      assert.equal(e, 'wrong password');
      return done();
    });
  });

  it('can remove a user', function(done) {
    return User.remove({
      email: 'mocha@mocha.com'
    }, done);
  });
});
