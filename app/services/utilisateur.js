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
   utilisateur.findById = function (id, withRelated) {
     return new models.utilisateur({id: parseInt(id)}).fetch({withRelated:['rappels']});;
    }


  utilisateur.findAll = function(){
    return new models.utilisateur().fetchAll();
  }

  utilisateur.findByName = function(name){
    return new models.utilisateur().query(function(qb){
      qb.where('nom', 'LIKE', '%'+name+'');
    }).fetch({withRelated:['rappels']});
  }

  utilisateur.findAllByDiscr = function(discr){
    return new models.utilisateur({discr: discr}).fetchAll();
  }

  utilisateur.save = function(model){
    if(model.rappels){
      delete(model.rappels);
    }
    return this.findById(model.id, false).then(function(user){
      return user.save(model);
    });
  }

    return utilisateur;

}

module.exports = UtilisateurService;
