var assert = require('assert'),
  async = require('async'),
  utils = require('./utils'),
  Item = require('../models/item.js'),
  User = require('../models/user.js');

describe('item (model)', function() {
  var userId;
  before(function(done) {
    this.timeout(5000);
    return async.waterfall([
      function(cb) {
        return utils.db.connect(cb);
      },
      function(cb) {
        var user = new User({
          email: 'mocha@mocha.com',
          password: 'PASSWORD',
          geo: [1, 2]
        });
        return user.save(cb);
      },
      function(u, i, cb) {
        userId = u._id;
        return cb();
      }
    ], done);
  });

  after(utils.db.clear);

  it('can add an item', function(done) {
    var item = new Item({
      desc: 'item1',
      imageId: 'image1',
      owner: userId,
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
    Item.find({ owner : userId }, function(e, items) {
      assert.equal(items.length, 1);
      assert.equal(items[0].desc, 'item1');
      return done(e);
    });
  });
});
