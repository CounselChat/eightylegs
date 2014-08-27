module.exports = function(API_KEY) {
  var ROOT_URL    = 'https://' + API_KEY + '@api.80legs.com/v2/'
    , URLLIST_URL = ROOT_URL + 'urllists/'
    , CRAWL_URL   = ROOT_URL + 'crawls/'
    , urlList     = require('./lib/url_list')
    , crawl       = require('./lib/crawl')
    , ret         = {}

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
      crawl.get(name, CRAWL_URL, callback)
    }

    return ret
}