'use strict'


/**
*
*
*/
var UtilisateurCtrl = function($scope, $modal, $filter, UtilisateurService, fetchUtilisateurFilter){

  $scope.utilisateurs = UtilisateurService.findAllUtilisateurs();

  // Modal: called by edit(userId) and Add new user
  $scope.open = function(id_utilisateur, updatable) {

      var user = fetchUtilisateurFilter($scope.utilisateurs, id_utilisateur);

      var modalInstance = $modal.open({
          templateUrl: '../../partials/utilisateur/modal_edit_add.html',
          controller: ModalUtilisateurCtrl,
          resolve: {
              utilisateur: function() {
                  return user;
              },
              updatable: function(){
                return updatable;
              }
          }
      });
  };

}


UtilisateurCtrl.$inject = ['$scope', '$modal', '$filter', 'UtilisateurService', 'fetchUtilisateurFilter']

angular.module('hrReminder').controller('UtilisateurCtrl', UtilisateurCtrl);
