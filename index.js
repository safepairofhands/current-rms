const request = require('request');

var options = {
  headers: {
    'X-SUBDOMAIN': process.env.CURRENT_SUBDOMAIN,
    'X-AUTH-TOKEN': process.env.CURRENT_KEY
  }
};

function query(method, url, callback, params) {
  options.method = method;
  options.url = url;
  if(typeof params !== 'undefined' && params) {
    options.qs = params;
  }
  request.get(options, function(err, res, body) {
    callback(err,res,body);
  });
}

module.exports = {
  listProducts: function(callback, params) {
    query("GET", "https://api.current-rms.com/api/v1/products/", function(err, res, body) {
      callback(res,JSON.parse(body));
    }, params);
  },
  products: function(callback, id) {
    https://api.current-rms.com/api/v1/products/1
    query("GET", "https://api.current-rms.com/api/v1/products/" + id, function(err, res, body) {
      callback(res,JSON.parse(body));
    });
  }
};
