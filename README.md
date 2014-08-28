eightylegs
==========

Simplified api wrapper for 80legs api

## Quick Example
```javascript
var eightyLegs = require('eightylegs')('API_KEY')
  , list       = [ 'www.google.com', 'www.facebook.com' ]
  , name       = 'My first url list'
eightyLegs.createUrlList(name, list, function(err, result) {
  //If create successfully, result will be your url list name (My first url list)
})

var options = {
    app : 'FullPageContent.js' // Default value
  , urllist : name // Should not be empty
  , 'max_depth' : 0 // Default value
  , 'max_urls' : 20 // Default value
}
var crawlName = 'My first crawl'
eightyLegs.createCrawl(options, crawlName, function(err, result) {
    // If create successfully, result will be object that contains exact same property with 80legs default return value.
})
```

## Download
The source is available for download from [GitHub](https://github.com/Healtho/eightylegs).. Alternatively, you can install using Node Package Manager (npm):
```shell
npm install eightylegs
```

## Documentation

### Init

You can require eighylegs by simpily add your API_KEY as parameter
```javascript
var eightyLegs = require('eightylegs')('API_KEY')
```

### URL List
* [`createUrlList`](#createUrlList)
* [`getAllUrlLists`](#getAllUrlLists)
* [`getUrlListByName`](#getUrlListByName)
* [`deleteUrlList`](#deleteUrlList)

### Crawl
* [`createCrawl`](#createCrawl)
* [`getResultByName`](#getResultByName)

## URL List
<a name='createUrlList' />
### createUrlList(urlListName, urlList, callback)

Create a url list that contains an array of website urls that you want to crawl

__Arguments__
* `urlListName` - The name of url list that you want to create.
* `urlList` - An array consists of urls that you want to crawl
* `callback(err, result)` - A callback which is fired when create process is finished, if something went wrong, `err` will not be `null` and will consists two properties `code` and `message` representing related error code and message, please refer to 80legs api doc to see detail.

__Example__

```javascript
var eightyLegs = require('eightylegs')('API_KEY')
  , list       = [ 'www.google.com', 'www.facebook.com' ]
  , name       = 'My first url list'
eightyLegs.createUrlList(name, list, function(err, result) {
  //If create successfully, result will be your url list name (My first url list)
})
```
---------------------------------------
<a name='getAllUrlLists' />
### getAllUrlLists(callback)
Get all url lists that you create

__Arguments__
* `callback(err, result)` - A callback which is fired when get process is finished, if something went wrong, `err` will not be `null` and will consists two properties `code` and `message` representing related error code and message, please refer to 80legs api doc to see detail.


__Example__

```javascript
var eightyLegs = require('eightylegs')('API_KEY')
eightyLegs.getAllUrlLists(function(err, result) {
  //If get successfully, result will be your url lists (Formatted in array)
})
```
---------------------------------------
<a name='getUrlListByName' />
### getUrlListByName(urlListName, callback)

Get a url list that named `urlListName`

__Arguments__
* `urlListName` - The name of url list that you want to get.
* `callback(err, result)` - A callback which is fired when get process is finished, if something went wrong, `err` will not be `null` and will consists two properties `code` and `message` representing related error code and message, please refer to 80legs api doc to see detail.

__Example__

```javascript
var eightyLegs = require('eightylegs')('API_KEY')
  , name       = 'My first url list'
eightyLegs.getUrlListByName(name, function(err, result) {
  //If get successfully, result will be your url list named 'My first url list'
})
```
---------------------------------------
<a name='deleteUrlList' />
### deleteUrlList(urlListName, callback)

Delete a url list that named `urlListName`

__Arguments__
* `urlListName` - The name of url list that you want to delete.
* `callback(err, result)` - A callback which is fired when delete process is finished, if something went wrong, `err` will not be `null` and will consists two properties `code` and `message` representing related error code and message, please refer to 80legs api doc to see detail.


__Example__

```javascript
var eightyLegs = require('eightylegs')('API_KEY')
  , name       = 'My first url list'
eightyLegs.deleteUrlList(name, function(err, result) {
  //If delete succesfully, err will be null and result will be url list name (My first url list)
})
```
---------------------------------------