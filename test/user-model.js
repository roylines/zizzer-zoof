var assert = require('assert'),
  async = require('async'),
  utils = require('./utils'),
  User = require('../models/user.js');

describe('user (model)', function() {
  
  before(utils.db.connect);

  after(utils.db.clear);

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

  it('can update a user', function(done) {
    async.waterfall([
      function(cb) {
        return User.findOne({
          email: 'mocha@mocha.com'
        }, cb);
      },
      function(u, cb) {
        u.geo = [4, 5];
        return u.save(cb);
      }
    ], done);
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
