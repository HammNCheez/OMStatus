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

    (function(id) {
      Team.find({
        where: {
          problem: id
        },
        sort: {
          division: 1,
          venue: 1,
          longtermTime: 1
        }
      }).exec(function(err, teams) {
        if (err) return next(err);
        if (!teams) return next();

        var moment = require('moment');
        var _ = require("underscore");

        var venues = _.uniq(teams, false, function(team){return team.venue; });

        var sortedTeams = [];
        for (var i = 0; i < venues.length; i++) {
            var venue = _.where(teams, {venue: venues[i].venue});
            sortedTeams.push(venue);
        }

        res.view({
          probNum: id,
          venues: sortedTeams,
          moment: moment
        });
      });
    })(problem.id);
  }
};
