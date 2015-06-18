'use strict'


/**
 *
 * @param $scope
 * @constructor
 * @param FileUploader
 */
var UtilsCtrl = function ($scope, FileUploader) {

    var fileUploaderConfig = {
        url : 'api/import/csv',
        queueLimit : 1
    };
    $scope.uploader = new FileUploader(fileUploaderConfig);



};


UtilsCtrl.$inject = ['$scope', 'FileUploader']

angular.module('hrReminder').controller('UtilsCtrl', UtilsCtrl);
