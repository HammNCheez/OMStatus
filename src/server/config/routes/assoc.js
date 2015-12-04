'use strict';

module.exports = function (db, utils) {

  /********
   * Association *
   ********/
  return {

  /*
   * Create Association
   */
    create: function (req, res) {
      new db.association(req.body).save().then(
        function (assoc) {
          res.status(200).json(assoc);
        },
        function(err){
          utils.error(res, 403, {message: 'There was an issue creating the association.', err: err});
        });
    },

  /*
   * List Associations
   */
    list: function (req, res) {
      db.association.find({}).exec().then(
        function (assocs) {
          res.json(assocs || []);
        }, 
        function (err){
          utils.error(res, 403, {message: 'There was an issue retrieving associations.', err: err});
        });
    },

  /*
   *  Update Association
   */
    update: function (req, res) {
      db.association.findById(utils.id(req.params.id)).exec().then(
        function (assoc) {
          //update record
          assoc.name = utils.updateParam(assoc.name, req.body.name);

          return assoc.save();
        }
      ).then(
        function (assoc){ res.json(assoc); }
      ).catch(
        function (err){
          utils.error(res, 403, {message:'There was an issue updating association with specified id.', err: err});
        }
      );
    },

  /*
   * Delete Association
   */
    delete: function (req, res, next) {    
      db.association.findById(utils.id(req.params.id)).exec().then(
        function(assoc){
          return assoc.remove();
        }
      ).then(
        function(removed){
          res.json(removed);
        }
      ).catch(
        function(err){
          utils.error(res, 404, {message:'There was an issue deleting association with specified id.', err: err});
        }
      );
    }
  }
}
