var expect = require('chai').expect

describe('Create url list test', function() {
  it('Create url list', function(done) {
    this.timeout(50000)
    var crawler = require('../index')('p0t3mvrofjvoqv6wnx7mdzymh3ugnaj8')
      , name    = new Date()
    crawler.createUrlList(name, [ 'www.baidu.com' ], function(err, result) {
      expect(result).to.equal(name)
      done();
    })
  })

  it('Create duplicated url list', function(done) {
    this.timeout(50000)
    var crawler = require('../index')('p0t3mvrofjvoqv6wnx7mdzymh3ugnaj8')
      , name    = 'testCrawler99'
    crawler.createUrlList(name, [ 'www.baidu.com' ], function(err, result) {
      expect(err.code).to.equal(422)
      expect(err.message).to.equal('The URL name is duplicated.')
      done();
    })
  })
});

describe('Get url list', function() {
  it('get all url list', function(done) {
    this.timeout(60000)
    var crawler = require('../index')('p0t3mvrofjvoqv6wnx7mdzymh3ugnaj8')
      , name    = new Date()
    crawler.getAllUrlLists(function(err, result) {
      expect(err).to.be.null
      expect(result).to.have.length.above(2)
      done();
    })
  })

  it('get specific url', function(done) {
    this.timeout(50000)
    var crawler = require('../index')('p0t3mvrofjvoqv6wnx7mdzymh3ugnaj8')
      , name    = 'testCrawler99'
    crawler.getUrlListByName(name, function(err, result) {
      expect(err).to.be.null
      expect(result[0]).to.equal('www.baidu.com')
      expect(result.length).to.equal(1)
      done();
    })
  })
});