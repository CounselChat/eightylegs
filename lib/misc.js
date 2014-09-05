exports.partitionBy = function(array, num) {
  var result = []
  while (array.length != 0) {
    result.push(array.splice(0, num))
  }
  return result
}