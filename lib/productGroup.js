module.exports = function (query) {
  var module = {};

  module.list = function(callback, params) {
    query.get("https://api.current-rms.com/api/v1/product_groups/", function(err, res, body) {
      callback(res,JSON.parse(body));
    }, params);
  };

  return module;
};
