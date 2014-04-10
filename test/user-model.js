var assert = require('assert'),
  async = require('async'),
  utils = require('./utils'),
  User = require('../models/user.js');

describe('user (model)', function() {

  before(utils.db.connect);

  after(utils.db.clear);

  it('can add a user', function(done) {
    var user = new User({
      profileId: 'google:1',
      email: 'mocha@mocha.com',
      name: 'user1'
    });
    return user.save(done);
  });

  it('cannot add the same user twice', function(done) {
    var user = new User({
      profileId: 'google:1',
      email: 'mocha2@mocha.com',
      name: 'user2'
    });
    return user.save(function(e) {
      assert.equal(e.code, 11000);
      return done();
    });
  });

  it('can update the geo for a user', function(done) {
    async.waterfall([
      function(cb) {
        return User.findOne({
          profileId: 'google:1'
        }, cb);
      },
      function(u, cb) {
        u.geo = [4, 5];
        return u.save(cb);
      }
    ], done);
  });

  it.skip('findByEmailAndPassword for valid users should return id', function(done) {
    User.findByEmailAndPassword('mocha@mocha.com', 'PASSWORD', function(e, id) {
      assert.equal(e, null);
      assert(id);
      return done();
    });
  });

  it.skip('findByEmailAndPassword for missing email should return error', function(done) {
    User.findByEmailAndPassword(null, 'PASSWORD', function(e, id) {
      assert.equal(e, 'wrong user');
      return done();
    });
  });

  it.skip('findByEmailAndPassword for invalid email should return error', function(done) {
    User.findByEmailAndPassword('missing@missing.com', 'PASSWORD', function(e, id) {
      assert.equal(e, 'wrong user');
      return done();
    });
  });

  it.skip('findByEmailAndPassword for invalid password should return error', function(done) {
    User.findByEmailAndPassword('mocha@mocha.com', 'WRONGPASSWORD', function(e, id) {
      assert.equal(e, 'wrong password');
      return done();
    });
  });

  it('can remove a user', function(done) {
    return User.remove({
      profileId: 'google:1'
    }, done);
  });
});
