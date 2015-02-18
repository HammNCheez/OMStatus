/**
 * ProblemController
 *
 * @description :: Server-side logic for managing Problems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res, next) {

    res.redirect('/');

  },

  show: function(req, res, next) {
    var problem = req.allParams();

    var sort = {
      division: 1,
      venue: 1
    };

    if (problem.sort && problem.sort === 'spontaneous') {
      sort.sponTime = 1;
    } else {
      sort.longtermTime = 1;
    }

    (function(id, sort) {
      Team.find({
        where: {
          problem: id
        },
        sort: sort
      }).exec(function(err, teams) {
        if (err) return next(err);
        if (!teams) return next();
        
        var _ = require("underscore");

        var venues = _.uniq(teams, false, function(team) {
          return team.venue;
        });

        var sortedTeams = [];
        for (var i = 0; i < venues.length; i++) {
          var venue = _.where(teams, {
            venue: venues[i].venue
          });
          sortedTeams.push(venue);
        }

        res.view({
          probNum: id,
          venues: sortedTeams,
          Utils: UtilityService
        });
      });
    })(problem.id, sort);
  }
};
