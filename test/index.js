var chai = require('chai');

var assert = chai.assert,
    should = chai.should(),
    expect = chai.expect,
    scapegoat = require('../index')(process.env.CURRENT_SUBDOMAIN, process.env.CURRENT_KEY),
    listProducts = scapegoat.listProducts,
    products = scapegoat.products;

    console.log(scapegoat.listProducts);

describe('Product Tests', function() {

  it('List Products returns 200 status', function(done) {
    listProducts(function(res,body) {
      res.statusCode.should.equal(200);
      done();
    });
  });

  it('List Products returns the correct page and per page', function(done) {
    listProducts(function(res,body) {
      body.meta.per_page.should.equal(1);
      body.meta.page.should.equal(2);
      done();
    }, { per_page: 1, page: 2 } );
  });

  it('Products returns a specified product', function(done) {
    // Get an ID of an existing product first
    listProducts(function(res,body) {
      var testProduct = {
        id: body.products[0].id,
        name: body.products[0].name
      };
      products(function(res,body) {
        body.product.name.should.equal(testProduct.name);
        done();
      }, testProduct.id);

    }, { per_page: 1 } );
  });

});
