'use strict';

/* Controllers */

var RappelCtrl = function ($scope, $filter, $routeParams, $location, $route, toastr, RappelService, UtilisateurService) {




  $scope.add = function(){
    $scope.updatable = true;
  }

  $scope.edit = function(){
      $scope.view();
      $scope.updatable = true;
  }


  $scope.list = function(){

  }

  $scope.view = function(){
    var id = $routeParams.id;
    RappelService.findRappelById(id).then(function(data){
      $scope.rappel = data;
    })
  }

  $scope.user = function(){
    UtilisateurService.findUtilisateurById($routeParams.id).then(function(data){
      $scope.utilisateur = data;
    })
  }


  $scope.$init = function(){
    var method = $filter('getMethodFromCurrentUrl')();
    if ($scope[method]) {
      $scope[method]();
      $scope.userMethod = $filter('translate')('user.'+method);
    }else{
      RappelService.findAllRappelsForNextMonth().then(function(data){
        $scope.allUpcomingRappels = data;
      });

      RappelService.findAllPastRappels().then(function(data){
        $scope.allPastRappels = data;
      });
    }
  }

  $scope.$init();




};

RappelCtrl.$inject = ['$scope', '$filter', '$routeParams', '$location', '$route', 'toastr', 'RappelService', 'UtilisateurService'];

angular.module('hrReminder').controller('RappelCtrl', RappelCtrl);
