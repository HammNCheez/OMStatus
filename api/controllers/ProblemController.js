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

                    res.view({
                    	probNum: id,
                        teams: teams,
                        moment: moment
                    });
                });
            })(problem.id);


        // Team.find({
        //     where: {
        //         problem: problem.id
        //     },
        //     sort: {
        //         division: 0,
        //         longtermTime: 0
        //     }
        // }).exec(function(err, teams, ) {
        //     if (err) return next(err);
        //     if (!teams) return next();

        //     res.view({
        //         teams: teams
        //     });
        // });
    },
    showTeams: function(req, res) {
        res.view();
    }
};
