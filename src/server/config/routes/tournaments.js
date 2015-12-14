'use strict';

module.exports = function (db, utils) {

  /********
   * Tournament *
   ********/
  return {

  /*
   * Create Tournament
   */
    create: function (req, res) {
      new db.tournament(req.body).save().then(
        function (tournament) {
          res.status(200).json(tournament);
        },
        function(err){
          utils.error(res, 403, {message: 'There was an issue creating the tournament.', err: err});
        });
    },

  /*
   * List Tournaments
   */
    list: function (req, res) {
      db.tournament.find({}).sort({date: 1}).exec().then(
        function (tournaments) {
          res.json(tournaments || []);
        }, 
        function (err){
          utils.error(res, 403, {message: 'There was an issue retrieving tournaments.', err: err});
        });
    },

  /*
   * Show One Tournament
   */
    getOne: function (req, res) {
      db.tournament.findById(utils.id(req.params.id)).exec().then(
        function (tournament) {
          res.json(tournament);
        },
        function (err){
          utils.error(res, 403, {message:'There was an issue retrieving tournament with specified id.', err: err});
        }
      );
    },

  /*
   *  Update Tournament
   */
    update: function (req, res) {
      db.tournament.findById(utils.id(req.params.id)).exec().then(
        function (tournament) {
          //update record
          tournament.name = utils.updateParam(tournament.name, req.body.name);
          tournament.assoc = utils.updateParam(tournament.assoc, req.body.assoc);
          tournament.level = utils.updateParam(tournament.level, req.body.level);
          tournament.date = utils.updateParam(tournament.date, req.body.date);
          tournament.year = utils.updateParam(tournament.year, req.body.year);

          if(req.body.location){
            tournament.location.name = utils.updateParam(tournament.location.name, req.body.location.name);
            if(req.body.location.address){
              tournament.location.address.street = utils.updateParam(tournament.location.address.street, req.body.location.address.street);
              tournament.location.address.city = utils.updateParam(tournament.location.address.city, req.body.location.address.city);
              tournament.location.address.state = utils.updateParam(tournament.location.address.state, req.body.location.address.state);
              tournament.location.address.zip = utils.updateParam(tournament.location.address.zip, req.body.location.address.zip);
            }
          }

          return tournament.save();
        }
      ).then(
        function (tournament){ res.json(tournament); }
      ).catch(
        function (err){
          utils.error(res, 403, {message:'There was an issue updating tournament with specified id.', err: err});
        }
      );
    },

  /*
   * Delete Tournament
   */
    delete: function (req, res, next) {    
      db.tournament.findById(utils.id(req.params.id)).exec().then(
        function(tournament){
          return tournament.remove();
        }
      ).then(
        function(removed){
          res.json(removed);
        }
      ).catch(
        function(err){
          utils.error(res, 404, {message:'There was an issue deleting tournament with specified id.', err: err});
        }
      );
    }
  }
}
