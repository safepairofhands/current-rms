var chai = require('chai');
global.td = require('testdouble');
var assert = chai.assert,
    expect = chai.expect;

describe('Query', function() {
  var query;
  var subject;

  beforeEach(function() {
    request = td.replace('request');
    subject = require('../index')('CURRENT_SUBDOMAIN', 'CURRENT_KEY');
  });
  afterEach(function() {
    td.reset();
  });

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
