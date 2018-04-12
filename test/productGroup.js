var chai = require('chai');
global.td = require('testdouble');
var assert = chai.assert,
    expect = chai.expect;

describe('Product Groups', function() {
  var query;
  var subject;

  beforeEach(function() {
    request = td.replace('request');
    subject = require('../index')('CURRENT_SUBDOMAIN', 'CURRENT_KEY');
  });
  afterEach(function() {
    td.reset();
  });

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
