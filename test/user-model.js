var User = require('../models/user.js'),
  async = require('async'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils');

describe('user (model)', function() {

  before(utils.db.connect);
  
  after(utils.db.clear);

  it('can add a user', function(done) {
    var user = new User({
      profileId: 'zombie:1',
      email: 'rick@woodbury.com',
      givenName: 'rick',
      familyName: 'grimes'
    });
    return user.save(done);
  });

  it('has set created and updated automagically', function(done) {
    return User.findOne({
      profileId: 'zombie:1'
    }, function(e, u) {
      expect(u.created).to.be.above(42);
      expect(u.updated).to.equal(u.created);
      return done(e);
    });
  });

  it('cannot add the same user twice', function(done) {
    var user = new User({
      profileId: 'zombie:1',
      email: 'rick@woodbury.com',
      givenName: 'rick',
      familyName: 'grimes'
    });
    return user.save(function(e) {
      expect(e.code).to.equal(11000);
      return done();
    });
  });

  it('can update the geo for a user', function(done) {
    async.waterfall([
      function(cb) {
        return User.findOne({
          profileId: 'zombie:1'
        }, cb);
      },
      function(u, cb) {
        u.geo = [4, 5];
        return u.save(cb);
      }
    ], done);
  });
  
  it('has set updated automagically', function(done) {
    return User.findOne({
      profileId: 'zombie:1'
    }, function(e, u) {
      expect(u.updated).to.not.equal(u.created);
      return done(e);
    });
  });

  it('can remove a user', function(done) {
    return User.remove({
      profileId: 'zombie:1'
    }, done);
  });
});
