'use strict';

/* Services */

var UtilsService = function (Restangular, $log) {


  /**
   * Get the list of discr
   * @param id utilisateur ID
   * @returns {*}
   */
  this.getListDiscr = function (callback) {
      $log.info("UtilService :: getListDiscr");
      Restangular.all('utils').all('list').all('discr').getList().then(function(result){
        callback(flattenListDiscr(result));
      });
  };

  /**
  *
  * Remove the extra information returned by the server response
  * We just need the disc values.
  *
  */
  var flattenListDiscr = function(result){
    var discrList = [];
    for(var key in result){
      if(result[key] && result[key].hasOwnProperty('discr')){
        discrList.push(result[key]['discr']);
      }
    }
    return discrList;
  }

};

UtilsService.$inject = ["Restangular", "$log"];


angular.module('hrReminder').service('UtilsService', UtilsService);
