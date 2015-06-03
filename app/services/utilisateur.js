/**
 *
 * Utilisateur Services
 *
 * @param models
 * @constructor
 */
UtilisateurService = function (models) {


    var utilisateur = {};

    /**
     * Retourne un utilisateur avec ces rappels
     *
     * @param id
     * @returns {models.utilisateur}
     */
     utilisateur.findById = function (id) {
       return new models.utilisateur({id: parseInt(id)}).fetch({withRelated:['rappels']});
      }


      utilisateur.findAll = function(){
        return new models.utilisateur.fetchAll();
      }

      utilisateur.findByName = function(name){
        return new models.utilisateur.({nom: name}).fetch({withRelated:['rappels']});
      }

    return utilisateur;

};

module.exports = UtilisateurService;
