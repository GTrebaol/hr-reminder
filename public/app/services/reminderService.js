'use strict';

/**
 *
 * @param Restangular
 * @param $log
 * @param $filter
 * @constructor
 */
var ReminderService = function (Restangular, $log, $filter) {

    /**
     * Get all the reminders happening in the given day
     * @param day
     * @returns {*}
     */
    this.findAllRemindersForUpcomingDay = function (day) {
        $log.info("ReminderService :: findAllRemindersForUpcomingDay");
        return Restangular.all('reminder').one('upcoming', day).getList();
    };

    /**
     * Get all the reminders happening in the next 30 days
     * @returns {*}
     */
    this.findAllRemindersForNextMonth = function () {
        $log.info("ReminderService :: findAllForNextMonth");
        return Restangular.all('reminder').all('upcoming').getList();
    };

    /**
     * Get a single reminder from the database
     * @param id reminder ID
     * @returns {*}
     */
    this.findReminderById = function (id) {
        $log.info("ReminderService :: findReminderById");
        return Restangular.one('reminder', id).get();
    };

    this.findAllPastReminders = function () {
        $log.info("ReminderService :: findAllPastReminders");
        return Restangular.all('reminder').all('past').getList();
    };

    this.saveOrCreateReminder = function (reminder) {
        $log.info("ReminderService :: saveOrCreateReminder");
        handleTimeZone(reminder);
        return Restangular.all('reminder').all('update').customPUT(reminder);
    };


    this.processReminder = function (id) {
        $log.info("ReminderService :: processReminder");
        return Restangular.one('reminder', id).all('traite').customGET();
    };


    this.getColorClass = function (reminder) {
        var today = new Date();
        var colorClass = ""
        if (reminder.traite == 1) {
            colorClass = $filter('translate')('reminder.css.traite');
        } else {
            if (new Date(reminder.date_rappel) < today) {
                colorClass = $filter('translate')('reminder.css.danger');
            } else if (new Date(reminder.date_rappel) > today.setDate(today.getDate() + 30)) {
                colorClass = $filter('translate')('reminder.css.normal');
            } else {
                colorClass = $filter('translate')('reminder.css.warning');
            }
        }
        return colorClass;
    };


    // Had HUGE issues with the timezone and restangular. This app is used in UTC +2 timezone
    // and since I used only date and not datetime, my values were like : 03/01/2015 00:00:00
    // Restangular would then transform this date into UTC, resulting into : 02/01/2015 22:00:00
    // The following code fix simply removes the time since I can't do it from the datepicker
    // but it's really really really ugly, sorry for that...
    var handleTimeZone = function (reminder) {
        if (reminder.date_rappel != null) {
            reminder.date_rappel = $filter('amDateFormat')(reminder.date_rappel, "YYYY-MM-DD");
        }

        if (reminder.date_rdv != null) {
            reminder.date_rdv = $filter('amDateFormat')(reminder.date_rdv, "YYYY-MM-DD");
        }
        return reminder;
    }


};

ReminderService.$inject = ["Restangular", "$log", "$filter"];


angular.module('hrReminder').service('ReminderService', ReminderService);
