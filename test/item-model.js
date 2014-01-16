var assert = require('assert'),
  async = require('async'),
  utils = require('./utils'),
  Item = require('../models/item.js'),
  User = require('../models/user.js');

describe('item (model)', function() {
  before(function(done) {
    return async.series([
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
      }
    ], done);
  });

  after(utils.db.clear);

  it('can add an item', function(done) {
    var item = new Item({
      desc: 'item1',
      imageId: 'image1',
      //owner: '',
      price: 10,
      created: new Date(),
      geo: [1, 2]
    });
    return item.save(done);
  });

  it.skip('can find nearby items', function(done) {
    Item.findNearby([1, 2], 1, function(e, items) {
      assert.equal(items.length, 1);
      assert.equal(items[0].desc, 'item1');
      return done(e);
    });
  });
});
