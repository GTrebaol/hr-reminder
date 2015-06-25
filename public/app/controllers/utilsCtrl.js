'use strict'


/**
 *
 * @param $scope
 * @constructor
 * @param $location
 * @param $filter
 * @param toastr
 * @param FileUploader
 */
var UtilsCtrl = function ($scope, $location, $filter, toastr, FileUploader) {

    var fileUploaderConfig = {
        url : 'api/import/csv',
        queueLimit : 1
    };
    $scope.uploader = new FileUploader(fileUploaderConfig);

    $scope.uploader.onSuccessItem = function(item, res, status, headers){
        toastr.success($filter('translate')('upload.success') + res);
        $location.path("/user/list");
    };



};


UtilsCtrl.$inject = ['$scope', '$location', '$filter', 'toastr', 'FileUploader']

angular.module('hrReminder').controller('UtilsCtrl', UtilsCtrl);
