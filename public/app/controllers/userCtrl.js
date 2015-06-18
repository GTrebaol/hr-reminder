'use strict'


/**
 *
 *
 */
var UserCtrl = function ($scope, $modal, $filter, $route, $location,
                                $routeParams, toastr, UserService, UtilsService, ReminderService) {

    $scope.user = {};
    $scope.filters = {};
    $scope.listDiscr = [];

    $scope.dateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    };

    $scope.add = function () {
        $scope.$loadDiscrList();
        $scope.updatable = true;
    };

    $scope.edit = function () {
        $scope.view();
        $scope.$loadDiscrList();
        $scope.updatable = true;
    };


    $scope.list = function () {
        $scope.filters.currentPage = $routeParams.p ? $routeParams.p : 1;
        $scope.pageChanged();
        $scope.$loadDiscrList();
    };

    $scope.pageChanged = function () {
        UserService.findAllUsers($scope.filters).then(function (data) {
            $scope.users = data.users;
            $scope.filters = data.vars;
        });
    };


    $scope.view = function () {
        var id = $routeParams.id;
        UserService.findUserById(id).then(function (data) {
            $scope.user = data;
        });
    };


    $scope.getColorClass = function (reminder) {
        return ReminderService.getColorClass(reminder);
    };


    $scope.submit = function () {
        if ($scope.$isUserValid()) {
            UserService.saveOrCreateUser($scope.user).then(function (user) {
                toastr.success($filter('translate')('user.success'));
                $location.path("/user/" + user.id + "/view");
            })
        } else {
            toastr.error($filter('translate')('form.error'));
        }
    };

    $scope.setDiscrFilter = function (discr) {
        if ($scope.filters.discr[discr]) {
            delete $scope.filters.discr[discr];
        } else {
            $scope.filters.discr[discr] = true;
        }
    };

    $scope.$isUserValid = function () {
        return ($scope.user.nom) && ($scope.user.prenom) && ($scope.user.discr);
    };

    $scope.$loadDiscrList = function () {
        UtilsService.getListDiscr(function (data) {
            $scope.listDiscr = data;
            $scope.filters.discr = {};
        });
    };

    $scope.close = function (id) {
        ReminderService.processReminder(id).then(function (reminder) {
            $location.path("/reminder/add/" + reminder.user_id + "/user");
        })
    };

    $scope.$init = function () {
        var method = $filter('getMethodFromCurrentUrl')();
        if ($scope[method]) {
            $scope[method]();
            $scope.userMethod = $filter('translate')('user.' + method);
        }
    };


    $scope.$init();


}


UserCtrl.$inject = ['$scope', '$modal', '$filter', '$route', '$location',
    '$routeParams', 'toastr', 'UserService', 'UtilsService', 'ReminderService']

angular.module('hrReminder').controller('UserCtrl', UserCtrl);
