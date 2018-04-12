module.exports = function (subdomain, key) {
  var module = {};

  var request = require('request');

  var options = {
    headers: {
      'X-SUBDOMAIN': subdomain,
      'X-AUTH-TOKEN': key
    }
  };

  module.test = function(url, callback) {
    request.get(url, function(err, res, body) {
     callback(err,res,body);
    });
  }

  module.get = function(url, callback, params) {
    options.url = url;
    if(typeof params !== 'undefined' && params) {
      options.qs = params;
    }
    request.get(options, function(err, res, body) {
     callback(err,res,body);
    });
  }

  module.post = function(url, callback, params) {
    options.url = url;
    if(typeof params !== 'undefined' && params) {
      options.qs = params;
    }
    request.post(options, function(err, res, body) {
     callback(err,res,body);
    });
  }

  return module;
};
