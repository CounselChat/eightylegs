var request    = require('request')
  , JSONStream = require('JSONStream')
  , es         = require('event-stream')
  , async      = require('async')
  , _          = require('underscore')

/*
   * Create a crawl in 80 legs with specific name
   *
   * @param {options} required options to create a crawl (JSON)
   * @param {crawlName} the name of this crawl (string)
   * @param {url} the root url with API_KEY (string)
   * @param {callback} callback function (error, response)
   */
exports.create = function(options, crawlName, url, callback) {
  // var crawlData = {
  //     app         : 'FullPageContent.js'
  //   , urllist     : urlListName
  //   , 'max_depth' : 0
  //   , 'max_urls'  : 20
  // }
  if (!options.app) {
    options.app = 'FullPageContent.js'
  }
  if (!options[ 'max_depth' ]) {
    options[ 'max_depth'] = 0
  }
  if (!options[ 'max_urls' ]) {
    options[ 'max_urls' ] = 20
  }
  if (!options.urllist) {
    return callback({
      message : 'Error: specific url list name is required!'
    })
  }
  request.post(
    {
        url     : url + crawlName
      , headers : {
          'Content-Type' : 'application/json'
        }
      , body    : JSON.stringify(options)
    }
  , function(err, res, body) {
    if (err) {
      return callback(err)
    }
    switch (res.statusCode) {
      case 204:
        callback(null, crawlName)
        break;
      case 400:
        callback({
            code    : 400
          , message : 'The parameters are not valid JSON.'
        })
        break;
      case 401:
        callback({
            code    : 401
          , message : 'The API token is not authenticated to create crawls or the crawl falls outside of allowed parameters. This includes over the maximum Depth value, over the maximum URL value, or not enough crawl credits.'
        })
        break;
      case 415:
        callback({
            code    : 415
          , message : 'Content type is not set / set incorrectly.'
        })
        break;
      case 503:
        callback({
           code     : 503
          , message : 'The API is currently down.'
        })
        break;
      default:
        callback({
            code    : 422
          , message : 'There was an issue with the parameters. The issue is either missing some required parameters or the parameters are set to incorrect or non existant values (e.g. the App specified has not been uploaded).'
        })
    }
  });
}

function getResult(url, crawlName, callback) {
  request.get({
    url : url + crawlName
  }, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var urlList = JSON.parse(body)
      async.mapLimit(urlList, 3, function(url, callback) {
        request({
          url : url
        })
        .pipe(JSONStream.parse())
        .pipe(es.mapSync(function(data) {
          if (data) {
            return callback(null, data)
          } else {
            return callback({
                code    : 503
              , message : 'Something wrong'
            },null)
            //Need to be improved
          }
        }))
      }, function(err, results) {
        if (err) {
          callback({
              code    : 503
            , message : 'Something wrong'
          })
        } else {
          callback(null, _.flatten(results))
        }
      })
    } else {
      callback({
          code    : 503
        , message : 'Something wrong'
      })
    }
  })
}

exports.get = function(crawName, url, resultUrl, callback) {
  request.get(
    {
        url     : url + crawName
      , headers : {
        'Content-Type' : 'application/json'
        }
    }
  , function(err, res, body) {
      if (err) {
        return callback(err)
      }
      switch (res.statusCode) {
        case 200:
          var result = JSON.parse(body)
          if (result.status != 'COMPLETED') {
            callback(null, false)
          } else {
            getResult(resultUrl, crawName, callback)
          }
          break;
        case 401:
          callback({
              code    : 401
            , message : 'The API token is not authenticated to create crawls or the crawl falls outside of allowed parameters. This includes over the maximum Depth value, over the maximum URL value, or not enough crawl credits.'
          })
          break;
        case 404:
          callback({
              code    : 404
            , message : 'The crawl does not exist.'
          })
          break;
        case 503:
          callback({
             code     : 503
            , message : 'The API is currently down.'
          })
          break;
        default:
          callback({
              code    : 422
            , message : 'There was an issue with the parameters. The issue is either missing some required parameters or the parameters are set to incorrect or non existant values (e.g. the App specified has not been uploaded).'
          })
      }
    })
}