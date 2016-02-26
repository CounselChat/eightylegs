module.exports = function(API_KEY) {
  var ROOT_URL    = 'https://' + API_KEY + '@api.80legs.com/v2/'
    , URLLIST_URL = ROOT_URL + 'urllists/'
    , CRAWL_URL   = ROOT_URL + 'crawls/'
    , RESULT_URL  = ROOT_URL + 'results/'
    , urlList     = require('./lib/url_list')
    , crawl       = require('./lib/crawl')
    , misc        = require('./lib/misc')
    , async       = require('async')
    , events      = require('events')
    , _           = require('underscore')
    , util        = require('util')
    , ret         = {}

    function getResultCycle(crawlName, callback) {
      crawl.get(crawlName, CRAWL_URL, RESULT_URL, function(err, result) {
        if (result) {
          _.each(result, function(item) {
            callback(item)
          })
        } else {
          console.log('try another round of fetching result')
          getResultCycle(crawlName, callback)
        }
      })
    }

    Eventer = function() {
      events.EventEmitter.call(this);
    }
    util.inherits(Eventer, events.EventEmitter)

    Listener = function() {
    }

    ret.eventer = new Eventer();
    ret.listenter = new Listener(ret.eventer);
    ret.createUrlList = function(urlListName, list, callback) {
      //TODO
      //Need to add parameters checker
      urlList.create(urlListName, URLLIST_URL, list, callback);
    }

    ret.getAllUrlLists = function(callback) {
      urlList.getAll(URLLIST_URL, callback);
    }

    ret.getUrlListByName = function(name, callback) {
      urlList.get(name, URLLIST_URL, callback);
    }

    ret.deleteUrlList = function(name, callback) {
      urlList.del(name, URLLIST_URL, callback);
    }

    ret.createCrawl = function(options, crawlName, callback) {
      crawl.create(options, crawlName, CRAWL_URL, callback);
    }

    ret.getResultByName = function(name, callback) {
      crawl.get(name, CRAWL_URL, RESULT_URL, callback)
    }

    ret.viewAllCrawls = function(options, callback) {
      if (!callback) {
        crawl.getAll({}, CRAWL_URL, options);
      }
      else {
        crawl.getAll(options, CRAWL_URL, callback);
      }
    }

    ret.handle = function(type, callback) {
      ret.listenter[type] = function(data) {
        callback(null,data)
      }
      ret.eventer.on(type, ret.listenter[type])
    }

    ret.crawl = function(array, type, callback) {
      var newUrlList = misc.partitionBy(array, 10)
      async.map(newUrlList, function(item, callback) {
        var urlName = new Date().getTime().toString()
          , crawlName = new Date().getTime().toString()
        urlList.create(urlName, URLLIST_URL, item, function(err, result) {
          if (err) {
            callback(null, {
                error   : err
              , message : 'URL list create failed'
            })
          } else {
            var option = {}
            option.urllist = result
            crawl.create(option, crawlName, CRAWL_URL, function(err, results) {
              if (err) {
                callback(null, {
                    error   : err
                  , message : 'URL crawl create failed'
                })
              } else {
                getResultCycle(results, function(data) {
                  ret.eventer.emit(type, data)
                })
                callback(null)
              }
            })
          }
        })
      }, function(err, results) {
        callback(err, results)
      })
    }

    return ret
}
