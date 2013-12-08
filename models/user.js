var mongoose = require("mongoose");
mongoose.set('debug', true);

var schema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
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

schema.index({
  email: 1
}, {
  unique: true
});

module.exports = mongoose.model('User', schema);
