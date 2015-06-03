'use strict';

/* Controllers */

var ReminderCtrl = function (ReminderService, $scope, $location, $rootScope) {

  $scope.allUpcomingRappels = ReminderService.findAllRappelsForNextMonth();

  $scope.isActive = function (path, league) {
      var location = '/' + path;
      if (league) {
          return $scope.region === path;
      }
      if (!$scope.region) {
          return location === $location.path();
      }
  }

  $scope.isSubMenuActive = function (subMenu) {
      return $location.path().indexOf(subMenu) > -1;
  }

  $scope.buildUrl = function () {
      return $location.path().substring(0, $location.path().lastIndexOf('/'));
  }


};

ReminderCtrl.$inject = ['ReminderService', '$scope', '$location', '$rootScope'];

angular.module('hrReminder').controller('ReminderCtrl', ReminderCtrl);
