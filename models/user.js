var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  email: {
    type: String,
    index: {unique: true, dropDups: true}
  },
  geo: {
    type: [Number], // longitude, latitude
    index: "2dsphere"
  }
});

module.exports = mongoose.model('User', schema);
