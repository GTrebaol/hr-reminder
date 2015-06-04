

var ModalUtilisateurCtrl = function($scope, $modalInstance, utilisateur, updatable){


  $scope.utilisateur = utilisateur;
  $scope.updatable = updatable;



  // close modal
  $scope.cancel = function() {
     $modalInstance.dismiss('cancel');
  };

  // Add new user
  $scope.add = function() {

     $modalInstance.dismiss('cancel');
  };

  // Save edited user.
  $scope.save = function() {
     $scope.user.$save();
     $modalInstance.dismiss('cancel');
  };

  $scope.canUpdate = function(){
    return $scope.updatable;
  }


}

ModalUtilisateurCtrl.$inject = ['$scope', '$modalInstance', 'utilisateur', 'updatable'];

angular.module('hrReminder').controller('ModalUtilisateurCtrl', ModalUtilisateurCtrl);
