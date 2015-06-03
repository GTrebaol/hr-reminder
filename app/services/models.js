/**
 *  Instanciate the models based on the database schema.
 *  We need to describe the relationships between the entities
 *
 * @param bookshelf
 * @returns {{}}
 */
module.exports = function (bookshelf) {
    var models = {};

    var Utilisateur = bookshelf.Model.extend({
        tableName: "utilisateur",
        rappels: function () {
            return this.hasMany(Rappel);
        }
    });

    var Rappel = bookshelf.Model.extend({
        tableName: "rappel",
        utilisateur: function () {
            return this.belongsTo(Utilisateur);
        }
    });


    models.utilisateur = Utilisateur;
    models.rappel = Rappel;

    return models;
};
