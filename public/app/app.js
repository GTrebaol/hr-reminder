'use strict';

// Declare app level module which depends on filters, and services

var ReminderConfig = function ($locationProvider, $routeProvider, $translateProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl("./api");

    $routeProvider.when('/user/list', {
        templateUrl: '/partials/user/list.html',
        controller: 'UserCtrl'
    });

    $routeProvider.when('/user/add', {
        templateUrl: '/partials/user/form.html',
        controller: 'UserCtrl'
    });

    $routeProvider.when('/user/:id/edit', {
        templateUrl: '/partials/user/form.html',
        controller: 'UserCtrl'
    });

    $routeProvider.when('/user/:id/view', {
        templateUrl: '/partials/user/form.html',
        controller: 'UserCtrl'
    });

    $routeProvider.when('/user/:id/edit', {
        templateUrl: '/partials/user/form.html',
        controller: 'UserCtrl'
    });


    $routeProvider.when('/reminder/:id/edit', {
        templateUrl: '/partials/reminder/form.html',
        controller: 'ReminderCtrl'
    });

    $routeProvider.when('/reminder/add/:id/user', {
        templateUrl: '/partials/reminder/form.html',
        controller: 'ReminderCtrl'
    });

    $routeProvider.when('/reminder/:id/view', {
        templateUrl: '/partials/reminder/form.html',
        controller: 'ReminderCtrl'
    });

    $routeProvider.when('/reminder/list', {
        templateUrl: '/partials/reminder/list.html',
        controller: 'ReminderCtrl'
    });

    $routeProvider.when('/utils/import', {
        templateUrl: '/partials/utils/import.html',
        controller: 'UtilsCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/',
        templateUrl: '/partials/commons/home.html',
        controller: 'ReminderCtrl'
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
    'angularMoment',
    'angularFileUpload'
]).config(ReminderConfig);
