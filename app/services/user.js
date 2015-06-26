/**
 *
 * Utilisateur Services
 *
 * @param models
 * @constructor
 * @param logger
 * @param bookshelf
 */
UserService = function (models, logger, bookshelf, _) {


    var self = {};

    /**
     * find an user by its id
     *
     * @param id
     * @returns {models.user}
     */
    self.findById = function (id) {
        return new models.user({id: parseInt(id)}).fetch({withRelated: ['reminders', 'skills', 'customers', 'interviews']});
    };

    /**
     *
     * Find the users based on the filters values
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
        self._addSkillsFilter(query, filters);

        if (!count) {
            query.limit(filters.limit).offset(offset);
        }
        return query;

    };

    /**
     *  create subquery for skill filtering
     * @param query
     * @param filters
     * @returns {*}
     * @private
     */
    self._addSkillsFilter = function(query, filters){
        if(filters.skills && Object.keys(filters.skills).length > 0){
            var subquery = bookshelf.knex.select('user_has_skill.user_id').from('skill').innerJoin('user_has_skill', 'skill.id', 'user_has_skill.skill_id');
            var first = true;
            for (var i in filters.skills) {
                if (first) {
                    subquery.where('label', '=', '' + i.toString());
                    first = false;
                }
                else {
                    subquery.orWhere('discr', '=', '' + i.toString())
                }
            }
            query.whereIn('id', subquery);
        }
        return query;
    };

    /**
     * Create a subquery for the discr filters
     * @param query
     * @param filters
     * @private
     */
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

    /**
     * Count
     * @returns {*}
     */
    self.count = function () {
        return new models.user().query().count('id as cnt');
    };

    /**
     * Find an user by it's name
     * @param name
     * @returns {*}
     */
    self.findByName = function (name) {
        return new models.user().query(function (qb) {
            qb.where('nom', 'LIKE', '%' + name + '');
        }).fetch({withRelated: ['rappels']});
    };

    /**
     * Find users by their discr
     * @param discr
     * @returns {*}
     */
    self.findAllByDiscr = function (discr) {
        return new models.user({discr: discr}).fetchAll();
    };

    /**
     * insert or update an user
     * @param model
     * @returns {*}
     */
    self.save = function (model) {
        // The ORM doesn't remove the relations before doing operations on the entity.
        var newModel = _.omit(model, _.isObject);
        return models.user.forge(newModel).save();
    };

    return self;

}
;

module.exports = UserService;
