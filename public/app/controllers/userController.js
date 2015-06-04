'use strict'


/**
*
*
*/
var UserCtrl = function($scope, $modal, UtilisateurService){

  $scope.utilisateurs = UtilisateurService.findAllUtilisateurs();

}


UserCtrl.$inject = ['$scope', '$modal', 'UtilisateurService']

angular.module('hrReminder').controller('UserCtrl', UserCtrl);
