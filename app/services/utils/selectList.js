/**
 * Date Service
 *
 */

var assert = require('assert');

SelectListService = function (models) {

    var self = {};

    self.getListDiscr = function () {
        var query = new models.utilisateur().query(function (qb) {
            qb.groupBy('discr');
        });
        return query.fetchAll({columns: ['discr']});
    };

    return self;

};


module.exports = SelectListService;
