/**
 * Rappel services
 *
 * @param models
 * @param dateService
 */
ReminderService = function (models, dateService) {

    var self = {};
    var MONTH_OFFSET = 30;
    var TODAY_OFFSET = 0;

    self.findById = function (id) {
        return new models.reminder({id: id}).fetch({withRelated: ['user']});
    };

    self.findAllForUpcomingDay = function (day_offset) {
        var date = dateService.getDateWithOffset(day_offset);

        return new models.reminder({date_rappel: date, traite: 0}).fetchAll({withRelated: ['user']});
    };

    self.findAllForNextMonth = function () {
        var dateOffset = dateService.getDateWithOffset(MONTH_OFFSET);
        var dateToday = dateService.getDateToday();
        return new models.reminder().query(function (qb) {
            qb.where('date_rappel', '<=', dateOffset).andWhere('date_rappel', '>=', dateToday).andWhere('traite', '0');
        }).fetchAll({withRelated: 'user'});
    };

    self.findAllForToday = function () {
        return rappel.findAllForUpcomingDay(TODAY_OFFSET);
    };

    self.findAllPastRappels = function () {
        var dateToday = dateService.getDateToday();
        return new models.reminder().query(function (qb) {
            qb.where('date_rappel', '<', dateToday).andWhere('traite', '0');
        }).fetchAll({withRelated: 'user'});
    };

    self.setProcessed = function (model) {
        delete(model.user);
        return model.save({traite: 1});
    };


    self.save = function (model) {
        // The ORM doesn't remove the relations before doing operations on the entity.
        console.log(model.commentaire);
        if (model.user) {
            if (!model.utilisateur_id) {
                model.utilisateur_id = model.user.id;
            }
            delete(model.user);
        }
        return models.reminder.forge(model).save();
    };

    return self;

};

module.exports = ReminderService;
