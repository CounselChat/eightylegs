var request    = require('request')
  , JSONStream = require('JSONStream')
  , es         = require('event-stream')

/*
   * Create a url list in 80 legs with specific name
   *
   * @param {urlListName} the name of url list (string)
   * @param {url} the root url with API_KEY (string)
   * @param {urlList} the url list that going to be created (JSON)
   * @param {callback} callback function (error, response)
   */
exports.create = function(urlListName, url, urlList, callback) {
  request.put(
    {
        url     : url + urlListName
      , headers : {
          'Content-Type' : 'application/octet-stream'
        }
      , body    : JSON.stringify(urlList)
    }
  , function(err, res, body) {
    if (err || res.statusCode != 204) {
      if (err) {
        return callback(err)
      } else {
        var error = {}
        error.code = res.statusCode
        switch (res.statusCode) {
          case 401:
            error.message = 'The API token is not authenticated to post URL lists.'
            break;
          case 415:
            error.message = 'Content type is not set / set incorrectly.'
            break;
          case 503:
            error.message = 'The API is currently down.'
            break;
          default:
            error.message = 'The URL name is duplicated.'
        }
        return callback(error)
      }
    }
    callback(null, urlListName)
  });
}

/*
   * Get all url lists that user create
   * @param {url} the root url with API_KEY (string)
   * @param {callback} callback function (error, response)
   */
exports.getAll = function(url, callback) {
  request.get(
    {
        url : url
    }
  , function(err, res, body) {
    if (err) {
      return callback(err)
    }
    switch (res.statusCode) {
      case 200:
        callback(null, body)
        break;
      case 401:
        callback({
            code    : 401
          , message : 'The API token is not authenticated to view these files.'
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
          , message : 'Unproccessed request'
        })
    }
  });
}

/*
   * Get specific url list that user create
   * @param {urlListName} url list name (string)
   * @param {url} the root url with API_KEY (string)
   * @param {callback} callback function (error, response)
   */
exports.get = function(urlListName, url, callback) {
  request({
    url : url + urlListName
  })
  .pipe(JSONStream.parse())
  .pipe(es.mapSync(function(data) {
    if (data) {
      return callback(null, data)
    } else {
      return callback({
          code    : 404
        , message : 'Something wrong'
      })
      //Need to be improved
    }
  }))
}

/*
   * Get specific url list that user create
   * @param {urlListName} url list name (string)
   * @param {url} the root url with API_KEY (string)
   * @param {callback} callback function (error, response)
   */
exports.del = function(urlListName, url, callback) {
  require.del({
    url : url + urlListName
  }, function(err, res, body) {
    if (err) {
      return callback(err)
    }
    switch (res.statusCode) {
      case 204:
        callback(null, urlListName)
        break;
      case 401:
        callback({
            code    : 401
          , message : 'The API token is not authenticated to view these files.'
        })
        break;
      case 404:
        callback({
            code    : 404
          , message : 'This URL list does not exist.'
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
          , message : 'Unproccessed request'
        })
    }
  })
}