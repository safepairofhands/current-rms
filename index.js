module.exports = function (subdomain, key) {
  var module = {};

  var request = require('request');
  var query = require('./lib/query')(subdomain,key);
  var product = require('./lib/product')(query);
  var productGroup = require('./lib/productGroup')(query);
  var stockLevels = require('./lib/stockLevels')(query);
  var member = require('./lib/member')(query);

  module.query = query;
  module.product = product;
  module.productGroup = productGroup;
  module.stockLevels = stockLevels;
  module.member = member;

  return module;
};
