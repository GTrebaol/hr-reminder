/**
 *
 * Utilisateur Services
 *
 * @param models
 * @constructor
 * @param logger
 * @param bookshelf
 */
UserService = function (models, logger, bookshelf) {


    var self = {};

    /**
     * Retourne un user avec ces rappels
     *
     * @param id
     * @returns {models.utilisateur}
     */
    self.findById = function (id) {
        return new models.user({id: parseInt(id)}).fetch({withRelated: ['reminders']});
    };

    /**
     *
     * @param filters
     * @param count
     * @returns {*}
     */
    self.findAll = function (filters, count) {
        var offset = filters.limit * (filters.currentPage - 1);
        var query = bookshelf.knex('user');
        query.where(1, '=', 1);
        if (filters.nom) {
            query.andWhere('nom', 'LIKE', '%' + filters.nom + '%');
        }

        self._addDiscrFilter(query, filters);

        if (!count) {
            query.limit(filters.limit).offset(offset);
        }
        return query;
    };

    self._addDiscrFilter = function (query, filters) {
        if (filters.discr && Object.keys(filters.discr).length > 0) {
            query.andWhere(function () {
                var first = true;
                for (var i in filters.discr) {
                    if (first) {
                        this.where('discr', '=', '' + i.toString());
                        first = false;
                    }
                    else {
                        this.orWhere('discr', '=', '' + i.toString())
                    }
                }
            })
        }
    };


    self.count = function () {
        return new models.user().query().count('id as cnt');
    };

    self.findByName = function (name) {
        return new models.user().query(function (qb) {
            qb.where('nom', 'LIKE', '%' + name + '');
        }).fetch({withRelated: ['rappels']});
    };

    self.findAllByDiscr = function (discr) {
        return new models.user({discr: discr}).fetchAll();
    };

    self.save = function (model) {
        // The ORM doesn't remove the relations before doing operations on the entity.
        if (model.rappels) {
            delete(model.rappels);
        }
        return models.user.forge(model).save();
    };

    return self;

}
;

module.exports = UserService;
