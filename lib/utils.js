var utils = {};

utils.middleware = function(req, res, next) {
  res.send200Or500 = function(msg) {
    return function(e) {
      if(e) {
        console.error(msg, { error: e });
        return res.send(500);
      }
      return res.send(200);
    }
  };

  res.sendJSONOr500 = function(msg) {
    return function(e, json) {
      if(e) {
        console.error(msg, { error: e });
        return res.send(500);
      }
      return res.json(json);
    }
  };
  
  return next();
};

module.exports = utils;
