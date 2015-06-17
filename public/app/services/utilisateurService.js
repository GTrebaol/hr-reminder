'use strict';

/* Services */

var UtilisateurService = function (Restangular, $log, $filter) {

    /**
     * Get a single utilisateur from the database
     * @param id utilisateur ID
     * @returns {*}
     */
    this.findUtilisateurById = function (id) {
        $log.info("ReminderService :: findUtilisateurById");
        return Restangular.one('utilisateur', id).get();
    };


    /**
     * Get all the utilisateurs
     * @returns {*}
     **/
    this.findAllUtilisateurs = function (filters) {
        $log.info("ReminderService :: findAllUtilisateurs");
        return Restangular.all('utilisateur').customPOST(filters);
    };


    this.saveOrCreateUtilisateur = function (utilisateur) {
        $log.info("ReminderService :: saveOrCreateUtilisateur");
        handleTimeZone(utilisateur);
        return Restangular.all('utilisateur').all('update').customPUT(utilisateur);
    };


    // Had HUGE issues with the timezone and restangular. This app is used in UTC +2 timezone
    // and since I used only date and not datetime, my values were like : 03/01/2015 00:00:00
    // Restangular would then transform this date into UTC, resulting into : 02/01/2015 22:00:00
    // The following code fix simply removes the time since I can't do it from the datepicker
    // but it's really really really ugly, sorry for that...
    var handleTimeZone = function (utilisateur) {
        if (utilisateur.date_embauche) {
            utilisateur.date_embauche = $filter('amDateFormat')(utilisateur.date_embauche, "YYYY-MM-DD");
        }

        if (utilisateur.dernier_ese) {
            utilisateur.dernier_ese = $filter('amDateFormat')(utilisateur.dernier_ese, "YYYY-MM-DD");
        }

        if (utilisateur.prochain_ese) {
            utilisateur.prochain_ese = $filter('amDateFormat')(utilisateur.prochain_ese, "YYYY-MM-DD");
        }

        return utilisateur;

    }


};

UtilisateurService.$inject = ["Restangular", "$log", "$filter"];


angular.module('hrReminder').service('UtilisateurService', UtilisateurService);
