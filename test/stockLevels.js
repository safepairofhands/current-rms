var chai = require('chai');
global.td = require('testdouble');
var assert = chai.assert,
    expect = chai.expect;

describe('Stock Level', function() {
  var query;
  var subject;

  beforeEach(function() {
    request = td.replace('request');
    subject = require('../index')('CURRENT_SUBDOMAIN', 'CURRENT_KEY');
  });
  afterEach(function() {
    td.reset();
  });

  it('Gets stock levels for a given product', function(done) {
    var mock = { productId: 1, hello: "world" }
    var options = { 
      headers: {
        'X-SUBDOMAIN': 'CURRENT_SUBDOMAIN',
        'X-AUTH-TOKEN': 'CURRENT_KEY' },
      url: 'https://api.current-rms.com/api/v1/products/' + mock.productId + '/stock_levels/'
    };
    td.when(request.get(options)).thenCallback(null,null, JSON.stringify(mock));

    subject.stockLevels.get(function(res, result) {
      expect(result).to.deep.equal(mock)
      done();
    }, mock.productId)
  });

});
