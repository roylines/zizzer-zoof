var assert = require('assert'),
  async = require('async'),
  utils = require('./utils'),
  Item = require('../models/item.js'),
  User = require('../models/user.js');

describe('item (model)', function() {
  var user;

  before(function(done) {
    this.timeout(5000);
    return async.waterfall([
      function(cb) {
        return utils.db.connect(cb);
      },
      function(cb) {
        user = new User({
          profileId: 'zombie:1',
          email: 'rick@woodbury.com',
          givenName: 'rick',
          familyName: 'grimes'
        });
        return user.save(cb);
      },
      function(u, i, cb) {
        user = u;
        return cb();
      }
    ], done);
  });

  after(utils.db.clear);

  it('can add an item', function(done) {
    var item = new Item({
      desc: 'item1',
      imageId: 'image1',
      owner: user._id,
      price: 10,
      created: new Date(),
      geo: [1, 2]
    });
    return item.save(done);
  });

  it('can find nearby items', function(done) {
    Item.findNearby([1, 2], 1, function(e, items) {
      assert.equal(items.length, 1);
      assert.equal(items[0].desc, 'item1');
      return done(e);
    });
  });

  it('can find items for owner', function(done) {
    Item.find({
      owner: user._id
    }, function(e, items) {
      assert.equal(items.length, 1);
      assert.equal(items[0].desc, 'item1');
      return done(e);
    });
  });
});
