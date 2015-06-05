'use strict';

/* Services */

var UtilsService = function (Restangular, $log) {

    /**
     * Get the list of discr
     * @param id utilisateur ID
     * @returns {*}
     */
    this.getListDiscr = function () {
        $log.info("UtilService :: getListDiscr");
        return Restangular.all('utils').all('list').all('discr').getList().$object;
    };

};

UtilsService.$inject = ["Restangular", "$log"];


angular.module('hrReminder').service('UtilsService', UtilsService);
