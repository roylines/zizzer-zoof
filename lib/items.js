var async = require('async'),
  logger = require('./logger'),
  Item = require('../models/item'),
  User = require('../models/user');

var items = {};

var getSelling = function(req, done) {
  if (req.query.status === 'selling') {
    return Item.find({
      owner: req.user._id
    }, res.sendJSONOr500('items.all'));
  }
  return done(null, []);
};

items.all = function(req, res) {
  logger.info('items.all');
  return getSelling(req, res.sendJSONOr500('items.all'));
};

items.add = function(req, res) {
  logger.info('items.add', {
    body: req.body
  });

  req.body.owner = req.user._id;

  var item = new Item(req.body);
  item.save(res.send200OrStatusCode(400, 'items.add', 'cannot add item'));
};

module.exports = items;
