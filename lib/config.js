var config = {};

var _config = {};

config.init = function(c) {
  _config = {
    _session: {
      secret: c.secret 
    },
    _server: {
      port: c.port
    },
    _mongo: {
      db: c.db || 'zz'
    },
    _google: {
      callbackURL: c.domain + (c.port ? ':' + c.port : '') + '/auth/google/callback',
      apiKey: c['google-api'],
      clientID: c['google-client'],
      clientSecret: c['google-secret']
    }
  };
}

config.session = function() {
  return _config._session;
};

config.server = function() {
  return _config._server;
};

config.mongo = function() {
  return _config._mongo
};

config.google = function() {
  return _config._google;
};

module.exports = config;
