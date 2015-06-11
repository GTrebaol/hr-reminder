'use strict';

/* Services */

var RappelService = function (Restangular, $log, $filter) {

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

    this.saveOrCreateRappel = function(rappel){
      $log.info("ReminderService :: saveOrCreateRappel");
      handleTimeZone(rappel);
      return Restangular.all('rappel').all('update').customPUT(rappel);
    }


    this.processRappel = function(id){
      $log.info("ReminderService :: processRappel");
      return Restangular.one('rappel', id).all('traite').customGET();
    }


  // Had HUGE issues with the timezone and restangular. This app is used in UTC +2 timezone
  // and since I used only date and not datetime, my values were like : 03/01/2015 00:00:00
  // Restangular would then transform this date into UTC, resulting into : 02/01/2015 22:00:00
  // The following code fix simply removes the time since I can't do it from the datepicker
  // but it's really really really ugly, sorry for that...
  var handleTimeZone = function(rappel){
    if(rappel.date_rappel != null){
      rappel.date_rappel = $filter('amDateFormat')(rappel.date_rappel, "YYYY-MM-DD");
    }

    if(rappel.date_rdv != null){
      rappel.date_rdv = $filter('amDateFormat')(rappel.date_rdv, "YYYY-MM-DD");
    }
    return rappel;
  }




};

RappelService.$inject = ["Restangular", "$log", "$filter"];


angular.module('hrReminder').service('RappelService', RappelService);
