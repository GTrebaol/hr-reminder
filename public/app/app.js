'use strict';

// Declare app level module which depends on filters, and services

var ReminderConfig = function ($locationProvider, $routeProvider, $translateProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl("./api");

    $routeProvider.when('/utilisateur/list', {
        templateUrl: '/partials/utilisateur/list.html',
        controller: 'UtilisateurCtrl'
    });

    $routeProvider.when('/utilisateur/add', {
        templateUrl: '/partials/utilisateur/form.html',
        controller: 'UtilisateurCtrl'
    });

    $routeProvider.when('/utilisateur/:id/edit', {
        templateUrl: '/partials/utilisateur/form.html',
        controller: 'UtilisateurCtrl'
    });

    $routeProvider.when('/utilisateur/:id/view', {
        templateUrl: '/partials/utilisateur/form.html',
        controller: 'UtilisateurCtrl'
    });

    $routeProvider.when('/utilisateur/:id/edit', {
        templateUrl: '/partials/utilisateur/form.html',
        controller: 'UtilisateurCtrl'
    });


    $routeProvider.when('/rappel/:id/edit', {
        templateUrl: '/partials/rappel/form.html',
        controller: 'RappelCtrl'
    });

    $routeProvider.when('/rappel/add/:id/user', {
        templateUrl: '/partials/rappel/form.html',
        controller: 'RappelCtrl'
    });

    $routeProvider.when('/rappel/:id/view', {
        templateUrl: '/partials/rappel/form.html',
        controller: 'RappelCtrl'
    });

    $routeProvider.when('/rappel/list', {
        templateUrl: '/partials/rappel/list.html',
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

ReminderConfig.$inject = ['$locationProvider', '$routeProvider', '$translateProvider', 'RestangularProvider', '$httpProvider'];

angular.module('hrReminder', [
    'restangular',
    'ngRoute',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ngAnimate',
    'toastr',
    'ui.date',
    'angularMoment'
]).config(ReminderConfig);
