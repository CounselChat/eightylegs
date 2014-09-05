var expect = require('chai').expect

describe('Create crawl test', function() {
  it('create crawl', function(done) {
    this.timeout(50000)
    var crawler = require('../index')('p0t3mvrofjvoqv6wnx7mdzymh3ugnaj8')
      , name    = new Date()
      , options = {
        urllist : 'crawl_state'
      }
    crawler.createCrawl(options, name, function(err, result) {
      expect(err).to.be.null
      expect(result).to.equal(name)
      done();
    })
  })

  it('create duplicated crawl', function(done) {
    this.timeout(50000)
    var crawler = require('../index')('p0t3mvrofjvoqv6wnx7mdzymh3ugnaj8')
      , name    = 'Test Crawler'
      , options = {
        urllist : 'crawl_state'
      }
    crawler.createCrawl(options, name, function(err, result) {
      expect(err.code).to.equal(422)
      done();
    })
  })
});

describe('Get crawl result test', function() {
  it('get crawl', function(done) {
    this.timeout(50000)
    var crawler = require('../index')('p0t3mvrofjvoqv6wnx7mdzymh3ugnaj8')
      , name    = 'Test Crawler'
    crawler.getResultByName(name, function(err, result) {
      expect(err).to.be.null
      expect(result.length).to.be.equal(1)
      done();
    })
  })
});