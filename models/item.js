var mongoose = require("mongoose"),
    User = require('./user');

// http://stackoverflow.com/questions/9230932/file-structure-of-mongoose-nodejs-project

var schema = new mongoose.Schema({
  desc: {
    type: String,
    required: true
  },
  imageId: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  price: {
    type: Number,
    max: 1000,
    required: true,
    message: "Price must be less than £1000"
  },
  created: {
    type: Date,
    required: true
  },
  geo: {
    type: [Number], // longitude, latitude
    index: "2dsphere",
    required: true
  }
});

schema.statics.findNearby = function(where, distance, done) {
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
