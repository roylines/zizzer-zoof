var expect = require('chai').expect,
  config = require('../lib/config'),
  db = require('../models/db'),
  express = require('express');
  //routes = require('../lib/routes');

describe('routes', function() {
  before = function() {
    this.oldDB = config.mongo.db;
    this.oldPort = config.port;
    config.mongo.db = 'zztest';
    config.port = 8888;
  };

  after = function() {
    config.mongo.db = this.oldDB;
    config.port = this.oldPort;
  };

  describe('listening', function() {
    after(function(done) {
      routes.close();
      return db.close(done);
    });
    it.skip('can start listening', function(done) {
      var app = express();
      expect(config.port).to.equal(8888);
      return routes.listen(app, done);
    });
  });
  /*
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
*/
});
