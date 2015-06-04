'use strict';

/* Controllers */

var ReminderCtrl = function (RappelService, $scope, $location, $rootScope) {

  $scope.allUpcomingRappels = ReminderService.findAllRappelsForNextMonth();


};

ReminderCtrl.$inject = ['RappelService', '$scope', '$location', '$rootScope'];

angular.module('hrReminder').controller('ReminderCtrl', ReminderCtrl);
