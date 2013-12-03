var mongoose = require("mongoose"),
    User = require('./user');

// http://stackoverflow.com/questions/9230932/file-structure-of-mongoose-nodejs-project

var schema = new mongoose.Schema({
  desc: {
    type: String
  },
  imageId: {
    type: String
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    index: true
  },
  price: {
    type: Number,
    max: 1000,
    message: "Price must be less than £1000"
  },
  created: {
    type: Date
  },
  geo: {
    type: [Number], // longitude, latitude
    index: "2dsphere"
  }
});

schema.methods.findNearby = function(where, distance, done) {
  return this.find({
    geo: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: where
        }
      },
      $maxDistance: distance
    }
  }, done);
};

module.exports = mongoose.model('Item', schema);
