var async = require('async'),
  Item = require('../models/item'),
  User = require('../models/user');

var items = {};

items.all = function(req, res) {
  async.waterfall([
    function(cb) {
      if (!req.query.email) {
        return cb(null, null);
      }

      return User.findOne({
        email: req.query.email
      }, cb);
    },
    function(user, cb) {
      var q = {};
      if (user) {
        q.owner = user;
      }

      return Item.find(q, cb);
    }
  ], res.sendJSONOr500('items.all'));
  /*
  var data = [];
  for (var i = 0; i < 20; ++i) {
    var item = {
      img: "http://thumbs1.ebaystatic.com/d/l225/m/mz7rD-Y7rS1jw3R0zGtI6_A.jpg",
      desc: "some description",
      price: "£10.00",
      expires: new Date().getTime()
    };
    data.push(item);
  }
  res.send(data);
  */
}

items.add = function(req, res) {
  res.send(404);
}

module.exports = items;
