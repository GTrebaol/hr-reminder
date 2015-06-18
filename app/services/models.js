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

    return models;
};
