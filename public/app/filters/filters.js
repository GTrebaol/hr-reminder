// This file will contains all the different filters we might need for the application


var uniqueFilter = function(collection, keyname){
  var output = [],
          keys = [];

  angular.forEach(collection, function (item) {
      var key = item[keyname];
      if (keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(item);
      }
  });
  return output;
}



angular.module('hrReminder').filter('unique', function () {return uniqueFilter;});
