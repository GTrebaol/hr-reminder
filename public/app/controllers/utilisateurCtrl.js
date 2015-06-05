'use strict'


/**
*
*
*/
var UtilisateurCtrl = function($scope, $modal, $filter, $route, $location, $routeParams, toastr, UtilisateurService, UtilsService){

  $scope.utilisateur = {};
  $scope.listDiscr = [];


  $scope.add = function(){
    $scope.$loadDiscrList();
    $scope.updatable = true;
  }

  $scope.edit = function(){
      var id = $routeParams.id;
      $scope.utilisateur = UtilisateurService.findUtilisateurById(id);
      $scope.$loadDiscrList();
      $scope.updatable = true;
  }


  $scope.list = function(){
    $scope.utilisateurs = UtilisateurService.findAllUtilisateurs();
  }

  $scope.view = function(){
    var id = $routeParams.id;
    $scope.utilisateur = UtilisateurService.findUtilisateurById(id);
  }



  $scope.submit = function(){
    if($scope.$isUtilisateurValid()){
      UtilisateurService.saveOrCreateUtilisateur($scope.utilisateur).then(function(utilisateur){
        toastr.success($filter('translate')('user.success'));
        $location.path( "/utilisateur/"+utilisateur.id+"/view" );
      })
    }else{
      toastr.error($filter('translate')('user.form.error'));
    }

  }


  $scope.$isUtilisateurValid = function(){
    return ($scope.utilisateur.nom) && ($scope.utilisateur.prenom) && ($scope.utilisateur.discr) && ($scope.utilisateur.annees_etudes && typeof $scope.utilisateur.annees_etudes  == 'number');
  }


  $scope.$loadDiscrList = function(){
    UtilsService.getListDiscr(function(data){
      $scope.listDiscr = data;
    });
  }

  $scope.$init = function(){
    var method = $route.current.method;
    if (method !== undefined) {
      $scope[method]();
      $scope.userMethod = $filter('translate')('user.'+method);
    }else{
      $location.path('/404');
    }
  }

  $scope.$init();


}


UtilisateurCtrl.$inject = ['$scope', '$modal', '$filter', '$route', '$location', '$routeParams', 'toastr', 'UtilisateurService', 'UtilsService']

angular.module('hrReminder').controller('UtilisateurCtrl', UtilisateurCtrl);
