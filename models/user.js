var async = require('async'),
mongoose = require('mongoose');

var schema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  geo: {
    type: [Number], // longitude, latitude
    required: true,
    index: "2dsphere"
  }
}, {
  autoIndex: true,
  strict: true
});

schema.methods.valid = function(email, password, done) {
  var id = null;
  async.waterfall([
    function(cb) {
      return this.findOne({
        email: email
      }, '_id, hash', cb);
    },
    function(u, cb) {
      if (u === null) {
        return cb('wrong user');
      }
      id = u._id;
      return pw.verify(u.hash, password, cb);
    },
    function(valid, cb) {
      if (!valid) {
        return cb('wrong password');
      }
      return cb(null, id);
    }
  ], done);
};

module.exports = mongoose.model('User', schema);
