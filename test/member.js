var chai = require('chai');
global.td = require('testdouble');
var assert = chai.assert,
    expect = chai.expect;

describe('Member', function() {
  var query;
  var subject;

  beforeEach(function() {
    request = td.replace('request');
    subject = require('../index')('CURRENT_SUBDOMAIN', 'CURRENT_KEY');
  });
  afterEach(function() {
    td.reset();
  });

  it('Gets a member', function(done) {
    var mock = { id: 1, hello: "world" }
    var options = { 
      headers: {
        'X-SUBDOMAIN': 'CURRENT_SUBDOMAIN',
        'X-AUTH-TOKEN': 'CURRENT_KEY' 
      },
      url: 'https://api.current-rms.com/api/v1/members/' + mock.id
    };
    td.when(request.get(options)).thenCallback(null,null, JSON.stringify(mock));

    subject.member.get(function(res, result) {
      expect(result).to.deep.equal(mock)
      done();
    }, mock.id)
  });

  it('Creates a member', function(done) {
    var mock = { id: 1, hello: "world" }
    var options = {
      headers: {
        'X-SUBDOMAIN': 'CURRENT_SUBDOMAIN',
        'X-AUTH-TOKEN': 'CURRENT_KEY' 
      },
      url: 'https://api.current-rms.com/api/v1/members/',
      body: mock,
      json: true
    };
    td.when(request.post(options)).thenCallback(null,null, JSON.stringify(mock));

    subject.member.create(function(res, result) {
      expect(result).to.deep.equal(JSON.stringify(mock))
      done();
    }, mock)
  });

  it('Updates a member', function(done) {
    var mockId = 1;
    var mock = { hello: "world" }
    var options = {
      method: 'PUT',
      headers: {
        'X-SUBDOMAIN': 'CURRENT_SUBDOMAIN',
        'X-AUTH-TOKEN': 'CURRENT_KEY'
      },
      url: 'https://api.current-rms.com/api/v1/members/' + mockId,
      form: mock
    };
    td.when(request(options)).thenCallback(null,null, JSON.stringify(mock));

    subject.member.update(function(res, result) {
      expect(result).to.deep.equal(JSON.stringify(mock))
      done();
    }, mockId, mock)
  });

});
