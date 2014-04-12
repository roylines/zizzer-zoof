var async = require('async'),
  mongoose = require('mongoose'),
  pw = require('credential');

var schema = new mongoose.Schema({
  profileId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  givenName: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    default: new Date().getTime()
  },
  updated: {
    type: Number
  },
  geo: {
    type: [Number], // longitude, latitude
    required: false,
    index: "2dsphere"
  }
}, {
  safe: true
});

var model = mongoose.model('User', schema);

schema.pre('save', function(done) {
  if (!this.updated) {
    this.updated = this.created;
  } else {
    this.updated = new Date().getTime();
  }
  return done();
});

module.exports = model;
