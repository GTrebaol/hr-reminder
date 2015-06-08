'use strict';

/* Controllers */

var RappelCtrl = function (RappelService, $scope) {

  RappelService.findAllRappelsForNextMonth().then(function(data){
    $scope.allUpcomingRappels = data;
  });

  RappelService.findAllPastRappels().then(function(data){
    $scope.allPastRappels = data;
  });
};

RappelCtrl.$inject = ['RappelService', '$scope'];

angular.module('hrReminder').controller('RappelCtrl', RappelCtrl);
