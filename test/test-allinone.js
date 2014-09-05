var expect = require('chai').expect

describe('All in one test', function() {
  it('Create handle and crawl', function(done) {
    this.timeout(10000000)
    var eightylegs = require('../index')('p0t3mvrofjvoqv6wnx7mdzymh3ugnaj8')
      , urlList    = [
          'http://www.conniecurlett.com/relationship-accountability-keep-your-side-of-the-street-clean/'
        , 'http://www.conniecurlett.com/did-your-feelings-get-hurt-just-catch-it-in-the-mitt/'
        ]
      , type = 'Blog'
      eightylegs.handle(type, function(err, result) {
        console.log('#############')
        console.log(result.url)
        console.log('#############')
        console.log('done')
      })
      eightylegs.crawl(urlList, type, function(err, result) {
        console.log('############')
        console.log(result)
        console.log(err)
        console.log('############')
      })

  });

});