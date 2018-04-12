var chai = require('chai');
global.td = require('testdouble');
var assert = chai.assert,
    expect = chai.expect;

describe('Product', function() {
  var query;
  var subject;

  beforeEach(function() {
    request = td.replace('request');
    subject = require('../index')('CURRENT_SUBDOMAIN', 'CURRENT_KEY');
  });
  afterEach(function() {
    td.reset();
  });


  it('Lists products', function(done) {
    var mock = { hello: "world" }
    var options = { 
      headers: {
        'X-SUBDOMAIN': 'CURRENT_SUBDOMAIN',
        'X-AUTH-TOKEN': 'CURRENT_KEY' },
      url: 'https://api.current-rms.com/api/v1/products/'
    };
    td.when(request.get(options)).thenCallback(null,null, JSON.stringify(mock));

    subject.product.list(function(res, result) {
      expect(result).to.deep.equal(mock)
      done();
    })
  });

  it('Gets a product', function(done) {
    var mock = { id: 1, hello: "world" }
    var options = { 
      headers: {
        'X-SUBDOMAIN': 'CURRENT_SUBDOMAIN',
        'X-AUTH-TOKEN': 'CURRENT_KEY' },
      url: 'https://api.current-rms.com/api/v1/products/' + mock.id
    };
    td.when(request.get(options)).thenCallback(null,null, JSON.stringify(mock));

    subject.product.get(function(res, result) {
      expect(result).to.deep.equal(mock)
      done();
    }, mock.id)
  });

});
