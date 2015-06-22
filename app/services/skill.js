/**
 *
 * Skill Services
 *
 * @param models
 * @constructor
 * @param logger
 */
SkillService = function (models, logger) {


    var self = {};


    self.findAll = function () {
        return new models.skill().fetchAll();
    };


    self.findUsersForSkill = function (label) {
        return new models.skills().fetch({label: label}).withRelated(['users']);
    };


    return self;

}
;

module.exports = SkillService;
