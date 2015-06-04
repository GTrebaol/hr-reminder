'use strict';

/* Controllers */

var RappelCtrl = function (RappelService, $scope) {

  $scope.allUpcomingRappels = RappelService.findAllRappelsForNextMonth();


};

RappelCtrl.$inject = ['RappelService', '$scope'];

angular.module('hrReminder').controller('RappelCtrl', RappelCtrl);
