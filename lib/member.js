module.exports = function (query) {
  var module = {};

  module.get = function(callback, id) {
    query.get("https://api.current-rms.com/api/v1/members/" + id, function(err, res, body) {
      callback(res,JSON.parse(body));
    });
  };

  module.create = function(callback, params) {
    query.post("https://api.current-rms.com/api/v1/members/", function(err, res, body) {
      callback(res,body);
    }, params);
  };

  module.update = function(callback, id, params) {
    query.put("https://api.current-rms.com/api/v1/members/" + id, function(err, res, body) {
      callback(res,body);
    }, params);
  };

  return module;
};
