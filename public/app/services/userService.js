'use strict';

/**
 *
 * @param Restangular
 * @param $log
 * @param $filter
 * @constructor
 */
var UserService = function (Restangular, $log, $filter) {

    /**
     * Get a single user from the database
     * @param id user ID
     * @returns {*}
     */
    this.findUserById = function (id) {
        $log.info("ReminderService :: findUserById");
        return Restangular.one('user', id).get();
    };


    /**
     * Get all the users
     * @returns {*}
     **/
    this.findAllUsers = function (filters) {
        $log.info("ReminderService :: findAllUsers");
        return Restangular.all('user').customPOST(filters);
    };


    this.saveOrCreateUser = function (user) {
        $log.info("ReminderService :: saveOrCreateUser");
        handleTimeZone(user);
        return Restangular.all('user').all('update').customPUT(user);
    };


    // Had HUGE issues with the timezone and restangular. This app is used in UTC +2 timezone
    // and since I used only date and not datetime, my values were like : 03/01/2015 00:00:00
    // Restangular would then transform this date into UTC, resulting into : 02/01/2015 22:00:00
    // The following code fix simply removes the time since I can't do it from the datepicker
    // but it's really really really ugly, sorry for that...
    var handleTimeZone = function (user) {
        if (user.date_embauche) {
            user.date_embauche = $filter('amDateFormat')(user.date_embauche, "YYYY-MM-DD");
        }

        if (user.dernier_ese) {
            user.dernier_ese = $filter('amDateFormat')(user.dernier_ese, "YYYY-MM-DD");
        }

        if (user.prochain_ese) {
            user.prochain_ese = $filter('amDateFormat')(user.prochain_ese, "YYYY-MM-DD");
        }

        return user;

    }


};

UserService.$inject = ["Restangular", "$log", "$filter"];


angular.module('hrReminder').service('UserService', UserService);
