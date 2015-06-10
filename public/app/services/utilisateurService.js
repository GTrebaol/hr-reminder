'use strict';

/* Services */

var UtilisateurService = function (Restangular, $log) {

    /**
     * Get a single utilisateur from the database
     * @param id utilisateur ID
     * @returns {*}
     */
    this.findUtilisateurById = function (id) {
        $log.info("ReminderService :: findUtilisateurById");
        return Restangular.one('utilisateur', id).get();
    };


    /**
    * Get all the utilisateurs
    * @returns {*}
    **/
    this.findAllUtilisateurs = function(page){
      $log.info("ReminderService :: findAllUtilisateurs");
      return Restangular.all('utilisateur').one('p',page).customGET();
    }


    this.saveOrCreateUtilisateur = function(utilisateur){
      $log.info("ReminderService :: saveOrCreateUtilisateur");
      handleTimeZone(utilisateur);
      return Restangular.all('utilisateur').all('update').customPUT(utilisateur);
    }


    // Had HUGE issues with the timezone and restangular. This app is used in UTC +2 timezone
    // and since I used only date and not datetime, my values were like : 03/01/2015 00:00:00
    // Restangular would then transform this date into UTC, resulting into : 02/01/2015 22:00:00
    // The following code fix that, but it's really really really ugly, sorry for that...
    var handleTimeZone = function(utilisateur){
      if(utilisateur.date_embauche){
        if(typeof utilisateur.date_embauche != Date){
          utilisateur.date_embauche = new Date(utilisateur.date_embauche);
        }
        utilisateur.date_embauche.setHours(utilisateur.date_embauche.getHours() + 2);
      }

      if(utilisateur.dernier_ese){
        if(typeof utilisateur.dernier_ese != Date){
          utilisateur.dernier_ese = new Date(utilisateur.dernier_ese);
        }
        utilisateur.dernier_ese.setHours(utilisateur.dernier_ese.getHours() + 2);
      }

      if(utilisateur.prochain_ese){
        if(typeof utilisateur.prochain_ese != Date){
          utilisateur.prochain_ese = new Date(utilisateur.prochain_ese);
        }
        utilisateur.prochain_ese.setHours(utilisateur.prochain_ese.getHours() + 2);
      }

      return utilisateur;

    }




};

UtilisateurService.$inject = ["Restangular", "$log"];


angular.module('hrReminder').service('UtilisateurService', UtilisateurService);
