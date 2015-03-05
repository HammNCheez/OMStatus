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

        //get unique divisions
        var divisions = _.uniq(teams, false, function(team) {
          return team.division;
        });

        var getVenue = function(team) {
          return team.venue;
        };

        var sortedDivs = [];
        for (var i = 0, len = divisions.length; i < len; i++) {
          //get all teams in this division
          var division = _.where(teams, {
            division: divisions[i].division
          });

          var sortedDiv = [];

          //get unique venues
          var venues = _.uniq(division, false, getVenue);

          for (var j = 0, venLen = venues.length; j < venLen; j++) {
            var venue = _.where(division, {
              venue: venues[j].venue
            });

            sortedDiv.push(_.sortBy(venue, 'longtermTime'));

          }
          sortedDivs.push(sortedDiv);
        }

        res.view({
          probNum: id,
          venues: sortedDivs,
          Utils: UtilityService
        });
      });
    })(problem.id, sort);
  },

  primary: function(req, res) {
    Team.find({
      where: {
        problem: 'P'
      },
      sort: {
        venue: 1,
        longtermTime: 1
      }
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
        venues: sortedTeams,
        Utils: UtilityService
      });
    });
  }
};
