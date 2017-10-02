var chai = require('chai');

var assert = chai.assert,
    should = chai.should(),
    expect = chai.expect,
    scapegoat = require('../index')(process.env.CURRENT_SUBDOMAIN, process.env.CURRENT_KEY),
    listProducts = scapegoat.listProducts,
    products = scapegoat.products,
    stockLevels = scapegoat.stockLevels,
    productGroups = scapegoat.productGroups;

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

describe('Product Group Tests', function() {

  it('Product Groups return product groups', function(done) {
    productGroups(function(res,body) {
      expect(body.product_groups[0]).to.have.any.keys('name');
      done();
    }, { per_page: 1, page: 1 } );
  });

});

describe('Stock Level Tests', function() {

  it('Stock Levels returns a stock level for a product', function(done) {
    // Get an ID of an existing product first
    listProducts(function(res,body) {
      var testProduct = {
        id: body.products[0].id,
        name: body.products[0].name
      };
      stockLevels(function(res,body) {
        expect(body.stock_levels[0]).to.have.any.keys('quantity_held');
        done();
      }, testProduct.id);
    }, { per_page: 1 } );
  });

});