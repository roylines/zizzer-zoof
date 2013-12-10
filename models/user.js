var async = require('async'),
  mongoose = require('mongoose'),
  pw = require('credential');

var schema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  geo: {
    type: [Number], // longitude, latitude
    required: true,
    index: "2dsphere"
  }
}, {
  safe: true
});

schema.pre('save', function(done) {
  var user = this;

  if (!user.isModified('password')) return done();

  return async.waterfall([
    function(cb) {
      return pw.hash(user.password, cb);
    },
    function(hash, cb) {
      user.password = hash;
      return cb();
    }
  ], done);
});

schema.methods.valid = function(email, password, done) {
  var id = null;
  async.waterfall([
    function(cb) {
      return this.findOne({
        email: email
      }, '_id, password', cb);
    },
    function(u, cb) {
      if (u === null) {
        return cb('wrong user');
      }
      id = u._id;
      return pw.verify(u.password, password, cb);
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
