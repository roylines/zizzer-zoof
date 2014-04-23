var _ = require('lodash'),
  config = require('../lib/config'),
  db = require('../models/db'),
  expect = require('chai').expect,
  express = require('express'),
  routes = require('../lib/routes'),
  utils = require('./utils');

describe('routes ->', function() {
  before(utils.logger.stub);
  before(function() {
    config.init({
      mongoDbName: 'zztest',
      port: 8888
    });
  });

  after(function(done) {
    config.init({});
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
