var chai = require('chai');
global.td = require('testdouble');
var assert = chai.assert,
    should = chai.should(),
    expect = chai.expect;
var query;
var subject;

beforeEach(function() {
  request = td.replace('request');
  subject = require('../index')('CURRENT_SUBDOMAIN', 'CURRENT_KEY');
});

afterEach(function() {
  td.reset();
});

describe('Query', function() {

  it('Performs a GET request', function(done) {
    var options = { 
      headers: {
        'X-SUBDOMAIN': 'CURRENT_SUBDOMAIN',
        'X-AUTH-TOKEN': 'CURRENT_KEY' },
      url: 'localhost'
    };
    td.when(request.get(options)).thenCallback('get');
    
    subject.query.get('localhost', function (result) {
      assert.equal(result, 'get');
      done();
    })
  });

  it('Performs a POST request', function(done) {
    var options = { 
      headers: {
        'X-SUBDOMAIN': 'CURRENT_SUBDOMAIN',
        'X-AUTH-TOKEN': 'CURRENT_KEY' },
      url: 'localhost'
    };
    td.when(request.post(options)).thenCallback('post');
    
    subject.query.post('localhost', function (result) {
      assert.equal(result, 'post');
      done();
    })
  });

});

describe('Products', function() {

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

describe('Product Groups', function() {

  it('Lists product groups', function(done) {
    var mock = { hello: "world" }
    var options = { 
      headers: {
        'X-SUBDOMAIN': 'CURRENT_SUBDOMAIN',
        'X-AUTH-TOKEN': 'CURRENT_KEY' },
      url: 'https://api.current-rms.com/api/v1/product_groups/'
    };
    td.when(request.get(options)).thenCallback(null,null, JSON.stringify(mock));

    subject.productGroup.list(function(res, result) {
      expect(result).to.deep.equal(mock)
      done();
    })
  });

});

describe('Stock Level', function() {

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
