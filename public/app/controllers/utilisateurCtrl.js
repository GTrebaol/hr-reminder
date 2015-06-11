'use strict'


/**
*
*
*/
var UtilisateurCtrl = function($scope, $modal, $filter, $route, $location,
  $routeParams, toastr, UtilisateurService, UtilsService, RappelService){

  $scope.utilisateur = {};
  $scope.filters = {};
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
    $scope.filters.currentPage = $routeParams.p ? $routeParams.p : 1;
    $scope.pageChanged();
    $scope.$loadDiscrList();
  }

  $scope.pageChanged = function(){
    UtilisateurService.findAllUtilisateurs($scope.filters).then(function(data){
        $scope.utilisateurs = data.utilisateurs;
        $scope.filters = data.vars;
    });
  }


  $scope.view = function(){
    var id = $routeParams.id;
    UtilisateurService.findUtilisateurById(id).then(function(data){
      $scope.utilisateur = data;
    });
  }


  $scope.getColorClass = function(rappel){
    return RappelService.getColorClass(rappel);
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

  $scope.setDiscrFilter = function(discr){
    if($scope.filters.discr[discr]){
      delete $scope.filters.discr[discr];
    }else{
      $scope.filters.discr[discr] = true;
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
      $scope.filters.discr = {};
    });
  }

  $scope.$init = function(){
    var method = $filter('getMethodFromCurrentUrl')();
    if ($scope[method]) {
      $scope[method]();
      $scope.userMethod = $filter('translate')('user.'+method);
    }
  }
  
  $scope.close = function(id){
    RappelService.processRappel(id).then(function(rappel){
      $location.path("/rappel/add/"+rappel.utilisateur_id+"/user");
    })
  }


  $scope.$init();


}


UtilisateurCtrl.$inject = ['$scope', '$modal', '$filter', '$route', '$location',
'$routeParams', 'toastr', 'UtilisateurService', 'UtilsService', 'RappelService']

angular.module('hrReminder').controller('UtilisateurCtrl', UtilisateurCtrl);
