var mongoose = require("mongoose");

// http://stackoverflow.com/questions/9230932/file-structure-of-mongoose-nodejs-project
var schema = new mongoose.Schema({
  title: {
    type: String
  },
  geo: {
    type: [Number],
    index: '2dsphere'
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
