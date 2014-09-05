var expect = require('chai').expect

describe('Misc function test', function() {
  it('partition the num within array length', function(done) {
    var misc   = require('../lib/misc')
      , array  = [ 1, 2, 3, 4 ]
      , result = misc.partitionBy(array, 2)
      expect(result.length).to.be.equal(2)
      expect(result[0].length).to.equal(2)
      done();
  });

  it('partition the num NOT within array length', function(done) {
    var misc   = require('../lib/misc')
      , array  = [ 1, 2, 3, 4 ]
      , result = misc.partitionBy(array, 5)
      expect(result.length).to.be.equal(1)
      expect(result[0].length).to.equal(4)
      done();
  });

});