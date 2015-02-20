/**
 * TeamController
 *
 * @description :: Server-side logic for managing Teams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function(req, res) {
    var params = req.params.all();
    res.view({
      problem: req.param('problem')
    });
  },

  'create': function(req, res) {
    if (req.session.user && (UtilityService.hasRole(req.session.user, 'scoreRoom') || req.session.user.admin)) {
      var team = req.params.all();

      team.longtermTime = new Date(team.longtermTime);

      team.sponTime = new Date(team.sponTime);

      Team.create(team).exec(function(err, team) {
        if (err) {
          console.log(err);

          req.session.flash = {
            err: err
          };

          return res.redirect('team/new');
        }

        res.redirect('team/show/' + team.id);
      });
    } else {
      req.session.flash = {
        err: {
          title: 'Unauthorized',
          message: 'To create a team you must be logged in and have the Score Room priveledge.'
        }
      };

      res.redirect('team/new');
    }
  },

  show: function(req, res, next) {
    var team = req.allParams();

    Team.findOne({
      id: team.id
    }).exec(function(err, team) {
      if (err) return next(err);
      if (!team) return next();

      res.view({
        team: team,
        Utils: UtilityService
      });
    });
  },

  edit: function(req, res, next) {
    if (req.session.user && (UtilityService.hasRole(req.session.user, 'scoreRoom') || req.session.user.admin)) {
      Team.findOne({
        id: req.param('id')
      }).exec(function(err, team) {
        if (err) return next(err);
        if (!team) return next('Team does\'t exist');

        res.view({
          team: team,
          Utils: UtilityService
        });
      });
    } else {
      req.session.flash = {
        err: {
          title: 'Unauthorized',
          message: 'To edit a team you must be logged in and have the Score Room priveledge.'
        }
      };

      res.redirect('team/new');
    }
  },

  update: function(req, res, next) {
    if (req.session.user && (UtilityService.hasRole(req.session.user, 'scoreRoom') || req.session.user.admin)) {
      var updatedTeam = req.params.all();

      Team.update({
        id: req.param('id')
      }, updatedTeam).exec(function(err) {
        if (err) {
          req.session.flash = {
            err: err
          };
          return res.redirect('/team/edit/' + req.param('id'));
        }

        res.redirect('/team/show/' + req.param('id'));
      });
    } else {
      req.session.flash = {
        err: {
          title: 'Unauthorized',
          message: 'To edit a team you must be logged in and have the Score Room priveledge.'
        }
      };

      res.redirect('team/new');
    }
  },

  flag: function(req, res, next) {
    var team = req.params.all();

    var update = {};

    switch (team.eventButton) {
      case "checkedIn":
        update.checkedIn = new Date();
        break;
      case "performed":
        update.performed = new Date();
        break;
      case "scoresReady":
        update.scoresReady = new Date();
        break;
      case "scoresPickedUpByCoach":
        update.scoresPickedUpByCoach = new Date();
        break;
      case "scoresPickedUpByScoreRoom":
        update.scoresPickedUpByScoreRoom = new Date();
        break;
      case "scoresAccepted":
        update.scoresAccepted = new Date();
        break;
      case "sponCheckedIn":
        update.sponCheckedIn = new Date();
        break;
      case "sponCompleted":
        update.sponCompleted = new Date();
    }

    Team.update({
      id: team.id
    }, update).exec(
      function(err) {
        if (err) {
          req.session.flash = {
            err: err
          };
        }

        res.redirect('/team/show/' + req.param('id'));
      });
  },

  checkIn: function(req, res, next) {
    if (req.session.user && UtilityService.hasRole(req.session.user, 'registration')) {
      Team.update({
        id: req.param('id')
      }, {
        checkedIn: new Date()
      }).exec(
        function(err) {
          if (err) {
            req.session.flash = {
              err: err
            };
          }

          res.redirect('/problem/' + req.param('problem'));
        });
    } else {
      res.redirect('/problem/' + req.param('problem'));
    }
  },

  removeFlag: function(req, res, next) {
    var update = {};

    switch (req.param('flag')) {
      case "checkedIn":
        update = {
          $unset: {
            checkedIn: 1
          }
        };
        break;
      case "performed":
        update = {
          $unset: {
            performed: 1
          }
        };
        break;
      case "scoresReady":
        update = {
          $unset: {
            scoresReady: 1
          }
        };
        break;
      case "scoresPickedUpByCoach":
        update = {
          $unset: {
            scoresPickedUpByCoach: 1
          }
        };
        break;
      case "scoresPickedUpByScoreRoom":
        update = {
          $unset: {
            scoresPickedUpByScoreRoom: 1
          }
        };
        break;
      case "scoresAccepted":
        update = {
          $unset: {
            scoresAccepted: 1
          }
        };
        break;
      case "sponCheckedIn":
        update = {
          $unset: {
            sponCheckedIn: 1
          }
        };
        break;
      case "sponCompleted":
        update = {
          $unset: {
            sponCompleted: 1
          }
        };
    }

    Team.native(function(err, collection) {
      var ObjectID = require('mongodb').ObjectID;
      var id = new ObjectID(req.param('id'));
      collection.update({
          _id: id
        }, update,
        function(err, object) {
          if (err) {
            req.session.flash = {
              err: err
            };
          }

          res.redirect('/team/show/' + req.param('id'));
        }
      );
    });
  },

  destroy: function(req, res, next) {
    if (req.session.user && (UtilityService.hasRole(req.session.user, 'scoreRoom') || req.session.user.admin)) {
      Team.findOne({
        id: req.param('id')
      }).exec(function(err, team) {
        if (err) return next(err);

        if (!team) return next('Team does\'t exist');

        Team.destroy({
          id: req.param('id')
        }).exec(function(err) {
          if (err) return next(err);
        });

        res.redirect('/problem/' + team.problem);
      });
    } else {
      req.session.flash = {
        err: {
          title: 'Unauthorized',
          message: 'To edit a team you must be logged in and have the Score Room priveledge.'
        }
      };

      res.redirect('/problem' + team.problem);
    }
  }

};
