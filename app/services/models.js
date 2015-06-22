/**
 *  Instanciate the models based on the database schema.
 *  We need to describe the relationships between the entities
 *
 * @param bookshelf
 * @returns {{}}
 */
module.exports = function (bookshelf) {
    var models = {};

    var User = bookshelf.Model.extend({
        tableName: "user",
        reminders: function () {
            return this.hasMany(Reminder);
        },
        interviews: function () {
            return this.hasMany(Interview);
        },
        skills: function () {
            return this.belongsToMany(Skill).through(UserHasSkill);
        },
        customers: function () {
            return this.belongsToMany(Customer).through(UserHasCustomer).withPivot(['date_debut', 'date_fin']);
        }
    });

    var Interview = bookshelf.Model.extend({
        tableName: "interview",
        user: function () {
            return this.belongsTo(User);
        }
    });

    var Skill = bookshelf.Model.extend({
        tableName: "skill",
        users: function () {
            return this.belongsToMany(User).through(UserHasSkill);
        }
    });

    var UserHasSkill = bookshelf.Model.extend({
        tableName: "user_has_skill",
        user: function () {
            this.belongsTo(User);
        },
        skill: function () {
            this.belongsTo(Skill);
        }
    });

    var Customer = bookshelf.Model.extend({
        tableName: "customer",
        users: function () {
            return this.belongsToMany(User).through(UserHasCustomer).withPivot(['date_debut', 'date_fin']);
        }
    });


    var UserHasCustomer = bookshelf.Model.extend({
        tableName: "user_has_customer",
        customer: function () {
            this.belongsTo(Customer);
        },
        user: function () {
            this.belongsTo(User);
        }
    });

    var Reminder = bookshelf.Model.extend({
        tableName: "reminder",
        user: function () {
            return this.belongsTo(User);
        }
    });


    models.user = User;
    models.reminder = Reminder;
    models.skill = Skill;
    models.customer = Customer;
    models.hasCustomer = UserHasCustomer;
    models.hasSkill = UserHasSkill;

    return models;
};
