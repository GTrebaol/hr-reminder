'use strict'


/**
*
*
*/
var UserCtrl = function($scope, $modal, ReminderService){

  $scope.utilisateurs = ReminderService.findAllUtilisateurs();
  console.log(JSON.stringify($scope.utilisateurs));

}


UserCtrl.$inject = ['$scope', '$modal', 'ReminderService']

angular.module('hrReminder').controller('UserCtrl', UserCtrl);
