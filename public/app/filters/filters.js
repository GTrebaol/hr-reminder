// This file will contains all the different filters we might need for the application


var uniqueFilter = function(){
  return function(collection, keyname){
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
}


var fetchUtilisateur = function(){
  return function(users, id) {
    for (var i = 0; i < users.length; i++) {
      if (users[i]['id'] == id) { //
        return users[i];
      }
    }
  }
}




angular.module('hrReminder').filter('unique', uniqueFilter);
angular.module('hrReminder').filter('fetchUtilisateur', fetchUtilisateur);
