'use strict'


/**
*
*
*/
var UtilisateurCtrl = function($scope, $modal, $filter, $route, $location, $routeParams, toastr, UtilisateurService, UtilsService){

  $scope.utilisateur = {};
  $scope.listDiscr = [];

  $scope.dateOptions = {
       changeYear: true,
       changeMonth: true,
       yearRange: '1900:-0'
   };

  $scope.add = function(){
    $scope.$loadDiscrList();
    $scope.updatable = true;
  }

  $scope.edit = function(){
      $scope.view();
      $scope.$loadDiscrList();
      $scope.updatable = true;
  }


  $scope.list = function(){
    UtilisateurService.findAllUtilisateurs().then(function(data){
      $scope.utilisateurs = data;
    });
  }

  $scope.view = function(){
    var id = $routeParams.id;
    UtilisateurService.findUtilisateurById(id).then(function(data){
      $scope.utilisateur = data;
    });
  }


  $scope.submit = function(){
    if($scope.$isUtilisateurValid()){
      UtilisateurService.saveOrCreateUtilisateur($scope.utilisateur).then(function(utilisateur){
        toastr.success($filter('translate')('user.success'));
        $location.path( "/utilisateur/"+utilisateur.id+"/view" );
      })
    }else{
      toastr.error($filter('translate')('form.error'));
    }
  }


  $scope.$formatDates = function(){
    $scope.utilisateur.date_embauche
  }

  $scope.$isUtilisateurValid = function(){
    return ($scope.utilisateur.nom) && ($scope.utilisateur.prenom) && ($scope.utilisateur.discr);
  }


  $scope.$loadDiscrList = function(){
    UtilsService.getListDiscr(function(data){
      $scope.listDiscr = data;
    });
  }

  $scope.$init = function(){
    var method = $filter('getMethodFromCurrentUrl')();
    if ($scope[method]) {
      $scope[method]();
      $scope.userMethod = $filter('translate')('user.'+method);
    }
  }



  $scope.$init();


}


UtilisateurCtrl.$inject = ['$scope', '$modal', '$filter', '$route', '$location', '$routeParams', 'toastr', 'UtilisateurService', 'UtilsService']

angular.module('hrReminder').controller('UtilisateurCtrl', UtilisateurCtrl);
