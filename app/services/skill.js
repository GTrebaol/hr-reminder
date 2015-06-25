/**
 *
 * Skill Services
 *
 * @param models
 * @constructor
 * @param logger
 */
SkillService = function (models, logger, underscore) {


    var self = {};


    self.findAll = function () {
        return new models.skill().fetchAll();
    };


    self.findUsersForSkill = function (label) {
        return new models.skill({label: label}).fetch({withRelated: ['users']});
    };


    self.findSkillForUsers = function (users) {
        return new models.hasSkill().query(function (qb) {
            var ids = [];
            for(var i = 0; i < users.length; i++){
                ids.push(users[i].id);
            }
            qb.whereIn('user_id',ids);
            console.log(qb.toString());
        }).fetchAll({withRelated: ['skill']});

    };


    return self;

}
;

module.exports = SkillService;
