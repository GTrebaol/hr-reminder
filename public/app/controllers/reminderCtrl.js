'use strict';

/* Controllers */

var ReminderCtrl = function ($scope, $filter, $routeParams, $location, $route, toastr, ReminderService, UserService) {


    $scope.reminder = {};
    $scope.user = {};

    $scope.add = function () {
        $scope.updatable = true;
    };

    $scope.edit = function () {
        $scope.view();
        $scope.updatable = true;
    };

    $scope.view = function () {
        var id = $routeParams.id;
        ReminderService.findReminderById(id).then(function (data) {
            $scope.reminder = data;
            $scope.user = data.user;
        });
    };

    $scope.user = function () {
        UserService.findUserById($routeParams.id).then(function (data) {
            $scope.user = data;
            $scope.reminder.user_id = $scope.user.id;
        });
        var today = new Date();
        var in6months = new Date(new Date(today).setMonth(today.getMonth() + 6));
        $scope.reminder.date_rappel = in6months;
        $scope.updatable = true;
    };


    $scope.close = function (id) {
        ReminderService.processReminder(id).then(function (reminder) {
            $location.path("/reminder/add/" + reminder.user_id + "/user");
        })
    };


    $scope.submit = function () {
        if ($scope.$isReminderValid()) {
            ReminderService.saveOrCreateReminder($scope.reminder).then(function (reminder) {
                toastr.success($filter('translate')('reminder.success'));
                $location.path("/reminder/" + reminder.id + "/view");
            })
        } else {
            toastr.error($filter('translate')('form.error'));
        }
    };


    $scope.$isReminderValid = function () {
        return ($scope.reminder.date_rappel != null)
    };


    $scope.$init = function () {
        var method = $filter('getMethodFromCurrentUrl')();
        if ($scope[method]) {
            $scope[method]();
            $scope.reminderMethod = $filter('translate')('reminder.' + method);
        } else {
            ReminderService.findAllRemindersForNextMonth().then(function (data) {
                $scope.allUpcomingReminders = data;
            });

            ReminderService.findAllPastReminders().then(function (data) {
                $scope.allPastReminders = data;
            });
        }
    };

    $scope.$init();


};

ReminderCtrl.$inject = ['$scope', '$filter', '$routeParams', '$location', '$route', 'toastr', 'ReminderService', 'UserService'];

angular.module('hrReminder').controller('ReminderCtrl', ReminderCtrl);
