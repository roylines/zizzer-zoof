var config = {};

config.session = function() {
  return {
    secret: process.env.ZZ_EXPRESS_SESSION_SECRET
  };
};

config.server = function() {
  return {
    port: +(process.env.ZZ_PORT) || 80
  };
};

config.mongo = function() {
  return {
    db: 'zz'
  };
};

config.google = function() {
  return {
    callbackURL: process.env.ZZ_DOMAIN + '/auth/google/callback',
    apiKey: process.env.ZZ_GOOGLE_API_KEY,
    clientID: process.env.ZZ_GOOGLE_CLIENT_ID,
    clientSecret: process.env.ZZ_GOOGLE_CLIENT_SECRET
  };
};

module.exports = config;
