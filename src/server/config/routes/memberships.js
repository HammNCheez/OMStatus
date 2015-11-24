'use strict';

module.exports = function (db, utils) {

  /********
   * Membership *
   ********/
  return {

  /*
   * Create Membership
   */
    create: function (req, res) {
      new db.membership(req.body).save().then(
        function (membership) {
          res.status(200).json(membership);
        },
        function(err){
          utils.error(res, 403, {message: 'There was an issue creating the membership.', err: err});
        });
    },

  /*
   * List Memberships
   */
    list: function (req, res) {
      db.membership.find({}).exec().then(
        function (memberships) {
          res.json(memberships || []);
        }, 
        function (err){
          utils.error(res, 403, {message: 'There was an issue retrieving memberships.', err: err});
        });
    },

  /*
   * Show Memberships for a division
   */
    byDiv: function (req, res) {
      db.membership.find({division: req.params.division}).exec().then(
        function (memberships) {
          res.json(memberships || []);
        }, 
        function (err){
          utils.error(res, 403, {message: 'There was an issue retrieving memberships.', err: err});
        });
    },
    
  /*
   * Show Memberships for a division and association
   */
    byAssocDiv: function (req, res) {
      db.membership.find({assoc: req.params.assoc.toUpperCase(), division: req.params.division.toUpperCase()}).exec().then(
        function (memberships) {
          res.json(memberships || []);
        }, 
        function (err){
          utils.error(res, 403, {message: 'There was an issue retrieving memberships.', err: err});
        });
    },

  /*
   * Show One Membership
   */
    getOne: function (req, res) {
      db.membership.findById(utils.id(req.params.id)).exec().then(
        function (membership) {
          res.json(membership);
        },
        function (err){
          utils.error(res, 403, {message:'There was an issue retrieving membership with specified id.', err: err});
        }
      );
    },

  /*
   *  Update Membership
   */
    update: function (req, res) {
      db.membership.findById(utils.id(req.params.id)).exec().then(
        function (membership) {
          //update record
          membership.name = utils.updateParam(membership.name, req.body.name);
          membership.number = utils.updateParam(membership.number, req.body.number);
          membership.division = utils.updateParam(membership.division, req.body.division);
          membership.assoc = utils.updateParam(membership.assoc, req.body.assoc);
          membership.year = utils.updateParam(membership.year, req.body.year);

          return membership.save();
        }
      ).then(
        function (membership){ res.json(membership); }
      ).catch(
        function (err){
          utils.error(res, 403, {message:'There was an issue updating membership with specified id.', err: err});
        }
      );
    },

  /*
   * Delete Membership
   */
    delete: function (req, res, next) {    
      db.membership.findById(utils.id(req.params.id)).exec().then(
        function(membership){
          return membership.remove();
        }
      ).then(
        function(removed){
          res.json(removed);
        }
      ).catch(
        function(err){
          utils.error(res, 404, {message:'There was an issue deleting membership with specified id.', err: err});
        }
      );
    }
  }
}
