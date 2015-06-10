'use strict';

/* Controllers */

var RappelCtrl = function ($scope, $filter, $routeParams, $location, $route, toastr, RappelService, UtilisateurService) {


  $scope.rappel = {};
  $scope.utilisateur = {};

  $scope.add = function(){
    $scope.updatable = true;
  }

  $scope.edit = function(){
      $scope.view();
      $scope.updatable = true;
  }

  $scope.view = function(){
    var id = $routeParams.id;
    RappelService.findRappelById(id).then(function(data){
      $scope.rappel = data;
      $scope.utilisateur = data.utilisateur;
    });
  }

  $scope.user = function(){
    UtilisateurService.findUtilisateurById($routeParams.id).then(function(data){
      $scope.utilisateur = data;
      $scope.rappel.utilisateur_id = $scope.utilisateur.id;
    });
    var today = new Date();
    var in6months = new Date(new Date(today).setMonth(today.getMonth()+6));
    $scope.rappel.date_rappel = in6months;
    $scope.updatable = true;
  }


  $scope.close = function(id){
    RappelService.processRappel(id).then(function(rappel){
      $location.path("/rappel/add/"+rappel.utilisateur_id+"/user");
    })
  }


  $scope.submit = function(){
    if($scope.$isRappelValid()){
      RappelService.saveOrCreateRappel($scope.rappel).then(function(rappel){
        toastr.success($filter('translate')('reminder.success'));
        $location.path( "/rappel/"+rappel.id+"/view" );
      })
    }else{
      toastr.error($filter('translate')('form.error'));
    }
  }


  $scope.$isRappelValid = function(){
    return ($scope.rappel.date_rappel != null)
  }


  $scope.$init = function(){
    var method = $filter('getMethodFromCurrentUrl')();
    console.log(method);
    if ($scope[method]) {
      $scope[method]();
      $scope.rappelMethod = $filter('translate')('reminder.'+method);
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
