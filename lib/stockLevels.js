module.exports = function (query) {
  var module = {};

  module.get = function(callback, id) {
    query.get("https://api.current-rms.com/api/v1/products/" + id + "/stock_levels/", function(err, res, body) {
      callback(res,JSON.parse(body));
    });
  };

  return module;
};
