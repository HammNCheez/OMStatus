'use strict';

module.exports = function (db, utils) {

  /********
   * Problem *
   ********/
  return {

  /*
   * Create Problem
   */
    create: function (req, res) {
      new db.problem(req.body).save().then(
        function (problem) {
          res.status(200).json(problem);
        },
        function(err){
          utils.error(res, 403, {message: 'There was an issue creating the problem.', err: err});
        });
    },

  /*
   * Add venue to Problem
   */
    addVenue: function (req, res) {
      //get problem
      db.problem.findById(utils.id(req.params.id)).exec().then(
        function (problem) {
          problem.venues.push(req.body);
          return problem.save();
        }
      ).then(
        function(problem){
          res.json(problem);
        }
      ).catch(
        function (err){
          utils.error(res, 403, {message:'There was an issue retrieving problem with specified id.', err: err});
        }
      );
    },
    
  /*
   * List Problems
   */
    list: function (req, res) {
      db.problem.find({}).populate('tournament venues.divisions.divP.membership venues.divisions.div1.membership')
      .populate('venues.divisions.div2.membership venues.divisions.div3.membership venues.divisions.div4.membership').exec().then(
        function (problems) {
          res.json(problems || []);
        }, 
        function (err){
          utils.error(res, 403, {message: 'There was an issue retrieving problems.', err: err});
        });
    },

  /*
   * Show specific problem for tournament
   */
    byTournament: function (req, res) {
      db.problem.find({tournament: req.params.tournament, number: req.params.probNum.toUpperCase()}).exec().then(
        function (problems) {
          res.json(problems || []);
        }, 
        function (err){
          utils.error(res, 403, {message: 'There was an issue retrieving problems.', err: err});
        });
    },

  /*
   * Show One Problem
   */
    getOne: function (req, res) {
      db.problem.findById(utils.id(req.params.id)).exec().then(
        function (problem) {
          res.json(problem);
        },
        function (err){
          utils.error(res, 403, {message:'There was an issue retrieving problem with specified id.', err: err});
        }
      );
    },

  /*
   *  Update Problem
   */
    update: function (req, res) {
      db.problem.findById(utils.id(req.params.id)).exec().then(
        function (problem) {
          //update record
          problem.name = utils.updateParam(problem.name, req.body.name);
          problem.number = utils.updateParam(problem.number, req.body.number);
          problem.year = utils.updateParam(problem.year, req.body.year);
          problem.tournament = utils.updateParam(problem.tournament, req.body.tournament);

          return problem.save();
        }
      ).then(
        function (problem){ res.json(problem); }
      ).catch(
        function (err){
          utils.error(res, 403, {message:'There was an issue updating problem with specified id.', err: err});
        }
      );
    },

  /*
   * Delete Problem
   */
    delete: function (req, res, next) {    
      db.problem.findById(utils.id(req.params.id)).exec().then(
        function(problem){
          return problem.remove();
        }
      ).then(
        function(removed){
          res.json(removed);
        }
      ).catch(
        function(err){
          utils.error(res, 404, {message:'There was an issue deleting problem with specified id.', err: err});
        }
      );
    }
  }
}
