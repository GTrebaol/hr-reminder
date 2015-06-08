'use strict';

/* Services */

var RappelService = function (Restangular, $log) {

    /**
     * Get all the rappels happening in the given day
     * @param day
     * @returns {*}
     */
    this.findAllRappelsForUpcomingDay = function (day) {
        $log.info("RappelService :: findAllRappelsForUpcomingDay");
        return Restangular.all('rappel').one('upcoming', day).getList();
    };

    /**
     * Get all the rappels happening in the next 30 days
     * @returns {*}
     */
    this.findAllRappelsForNextMonth = function () {
        $log.info("RappelService :: findAllForNextMonth");
        return Restangular.all('rappel').all('upcoming').getList();
    };

    /**
     * Get a single rappel from the database
     * @param id rappel ID
     * @returns {*}
     */
    this.findRappelById = function (id) {
        $log.info("RappelService :: findRappelById");
        return Restangular.one('rappel', id).get();
    };

    this.findAllPastRappels = function(){
      $log.info("RappelService :: findAllPastRappels");
      return Restangular.all('rappel').all('past').getList();
    }


};

RappelService.$inject = ["Restangular", "$log"];


angular.module('hrReminder').service('RappelService', RappelService);
