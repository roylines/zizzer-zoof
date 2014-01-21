var assert = require('assert'),
  routes = require('../lib/routes'),
  request = require('request');

var get = function(url, done) {
  return request('http://localhost:8000' + url, done);
};

var assert200 = function(response) {
  assert.equal(response.statusCode, 200);
};

describe('routes', function() {
  it('calling / should return 200', function(done) {
    get('/', function(e, response, body) {
      assert200(response); 
      return done();
    });
  });
});
