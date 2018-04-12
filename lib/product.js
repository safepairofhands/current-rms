module.exports = function (query) {
  var module = {};

  module.list = function(callback, params) {
    query.get("https://api.current-rms.com/api/v1/products/", function(err, res, body) {
      callback(res,JSON.parse(body));
    }, params);
  };

  module.get = function(callback, id) {
  	query.get("https://api.current-rms.com/api/v1/products/" + id, function(err, res, body) {
      callback(res,JSON.parse(body));
    });
  }

  return module;
};
