var assert = require('assert'),
  async = require('async'),
  db = require('../models/db'),
  express = require('express'),
  routes = require('../lib/routes'),
  request = require('request');

var port = 8888;

var get = function(url, done) {
  return request('http://localhost:' + port + url, done);
};

var assertStatusCode = function(url, statusCode) {
  return function(done) {
    get(url, function(e, response, body) {
      assert.equal(statusCode || 200, response.statusCode);
      return done(e);
    });
  };
};

describe('routes', function() {
  var app = express();

  before(function(done) {
    this.timeout(5000);
    return routes.listen(app, port, 'routestest', done);
  });

  after(function(done) {
    return db.close(done);
  });

  it('calling / should return 200', assertStatusCode('/'));
  it('calling /x should return 200', assertStatusCode('/x'));
  it('calling /partial/unknown should return 404', assertStatusCode('/partial/unknown', 404));
  it('calling /partial/selling should return 200', assertStatusCode('/partial/selling'));
  it('calling /logout should return 200', assertStatusCode('/logout'));
 
});
