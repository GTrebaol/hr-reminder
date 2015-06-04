'use strict';

/* Services */

var UtilisateurService = function (Restangular, $log) {

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

UtilisateurService.$inject = ["Restangular", "$log"];


angular.module('hrReminder').service('UtilisateurService', UtilisateurService);
