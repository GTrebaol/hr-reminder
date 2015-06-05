'use strict'


/**
*
*
*/
var UtilisateurCtrl = function($scope, $modal, $filter, $route, $location, $routeParams, $translate, UtilisateurService, UtilsService){


  $scope.add = function(){
    $scope.listDiscrObj = UtilsService.getListDiscr();
    $scope.updatable = true;
  }

  $scope.edit = function(){
      var id = $routeParams.id;
      $scope.utilisateur = UtilisateurService.findUtilisateurById(id);
      $scope.listDiscrObj = UtilsService.getListDiscr();
      $scope.updatable = true;
  }


  $scope.list = function(){
    $scope.utilisateurs = UtilisateurService.findAllUtilisateurs();
  }

  $scope.view = function(){
    var id = $routeParams.id;
    $scope.utilisateur = UtilisateurService.findUtilisateurById(id);
  }



  $scope.$init = function(){
    var method = $route.current.method;
    if (method !== undefined) {
      $scope[method]();
      $scope.userMethod = $translate(method+'_user');
    }else{
      $location.path('/404');
    }
  }

  $scope.$init();


}


UtilisateurCtrl.$inject = ['$scope', '$modal', '$filter', '$route', '$location', '$routeParams', '$translate', 'UtilisateurService', 'UtilsService']

angular.module('hrReminder').controller('UtilisateurCtrl', UtilisateurCtrl);
