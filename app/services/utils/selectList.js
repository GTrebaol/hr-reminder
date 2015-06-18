/**
 *
 * @param models
 * @returns {{}}
 * @constructor
 */
SelectListService = function (models) {

    var self = {};

    self.getListDiscr = function () {
        var query = new models.user().query(function (qb) {
            qb.groupBy('discr');
        });
        return query.fetchAll({columns: ['discr']});
    };

    return self;

};


module.exports = SelectListService;
