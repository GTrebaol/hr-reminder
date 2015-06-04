'use strict';

// Declare app level module which depends on filters, and services

var ReminderConfig = function ($locationProvider, $routeProvider, $translateProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl("http://localhost:8080/api");

    $routeProvider.when('/users/', {
        templateUrl: '/partials/utilisateur/list.html',
        controller: 'UtilisateurCtrl'
    });


    $routeProvider.when('/rappel/:id/', {
        templateUrl: '/partials/rappel/view.html',
        controller: 'RappelCtrl'
    });

    $routeProvider.otherwise({
      redirectTo: '/',
      templateUrl: '/partials/commons/home.html',
      controller: 'RappelCtrl'
      });

    $locationProvider.html5Mode(true);

    $translateProvider.useStaticFilesLoader({
        prefix: 'app/utils/i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('fr');
}

ReminderConfig.$inject = ['$locationProvider', '$routeProvider', '$translateProvider', 'RestangularProvider'];

angular.module('hrReminder', [
    'restangular',
    'ngRoute',
    'pascalprecht.translate',
    'ui.bootstrap'
]).config(ReminderConfig);
