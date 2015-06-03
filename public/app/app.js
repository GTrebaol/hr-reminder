'use strict';

// Declare app level module which depends on filters, and services

var ReminderConfig = function ($locationProvider, $routeProvider, $translateProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl("http://localhost:8080/api");

    $routeProvider.when('/league/:abbrRegion/:idLeague/matchday', {
        templateUrl: 'partials/matchday.html',
        controller: 'SupraballLeagueCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);


    $translateProvider.useStaticFilesLoader({
        prefix: 'app/utils/i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
}

ReminderConfig.$inject = ['$locationProvider', '$routeProvider', '$translateProvider', 'RestangularProvider'];

angular.module('hrReminder', [
    'restangular',
    'ngRoute',
    'pascalprecht.translate'
]).config(ReminderConfig);
