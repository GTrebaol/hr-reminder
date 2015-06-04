'use strict';

/* Services */

var ReminderService = function (Restangular, $log) {

    /**
     * Get all the rappels happening in the given day
     * @param day
     * @returns {*}
     */
    this.findAllRappelsForUpcomingDay = function (day) {
        $log.info("ReminderService :: findAllRappelsForUpcomingDay");
        return Restangular.all('rappel').one('upcoming', day).getList().$object;
    };

    /**
     * Get all the rappels happening in the next 30 days
     * @returns {*}
     */
    this.findAllRappelsForNextMonth = function () {
        $log.info("ReminderService :: findAllForNextMonth");
        return Restangular.all('rappel').all('upcoming').getList().$object;
    };

    /**
     * Get a single rappel from the database
     * @param id rappel ID
     * @returns {*}
     */
    this.findRappelById = function (id) {
        $log.info("ReminderService :: findRappelById");
        return Restangular.one('rappel', id).get().$object;
    };

    /**
     * Get a single utilisateur from the database
     * @param id utilisateur ID
     * @returns {*}
     */
    this.findUtilisateurById = function (id) {
        $log.info("ReminderService :: findUtilisateurById");
        return Restangular.one('utilisateur', id).get().$object;
    };


    /**
    * Get all the utilisateurs
    * @returns {*}
    **/
    this.findAllUtilisateurs = function(){
      $log.info("ReminderService :: findAllUtilisateurs");
      return Restangular.all('utilisateur').getList().$object;
    }

};

ReminderService.$inject = ["Restangular", "$log"];


angular.module('hrReminder').service('ReminderService', ReminderService);
