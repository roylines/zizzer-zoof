var expect = require('chai').expect,
  config = require('../lib/config'),
  db = require('../models/db'),
  express = require('express'),
  routes = require('../lib/routes'),
  utils = require('./utils'),
  sinon = require('sinon');

describe('routes ->', function() {
  before(utils.logger.stub);
  before(function() {
    sinon.stub(config, 'mongo').returns({
      db: 'zztest'
    });
    sinon.stub(config, 'server').returns({
      port: 8888
    });
  });

  after(function(done) {
    config.mongo.restore();
    config.server.restore();
    routes.close();
    return db.close(done);
  });
  after(utils.logger.restore);

  describe('listening ->', function() {
    it('can start listening', function(done) {
      var app = express();
      return routes.listen(app, done);
    });
  });
});
