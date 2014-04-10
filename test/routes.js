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
    routes.close();
    return db.close(done);
  });

  describe('unauthenticated', function() {
    it('calling / should return 200', assertStatusCode('/'));
    it('calling /partial/nav should return 200', assertStatusCode('/partial/nav', 200));
    it('calling /partial/landing should return 200', assertStatusCode('/partial/landing', 200));
    it('calling /partial/footer should return 200', assertStatusCode('/partial/footer', 200));
    it('calling /logout should return 200', assertStatusCode('/logout'));

    it('calling /partial/unknown should return 401', assertStatusCode('/partial/unknown', 401));
    it('calling /partial/selling unauthenticated should return 401', assertStatusCode('/partial/selling', 401));
  });

});
