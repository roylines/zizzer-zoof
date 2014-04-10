module.exports = {
  sessionSecret: process.env.ZZ_EXPRESS_SESSION_SECRET,
  google: {
    callbackURL: process.env.ZZ_DOMAIN + '/auth/google/callback',
    apiKey: process.env.ZZ_GOOGLE_API_KEY,
    clientID: process.env.ZZ_GOOGLE_CLIENT_ID,
    clientSecret: process.env.ZZ_GOOGLE_CLIENT_SECRET
  }
};
