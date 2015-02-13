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
        var team = req.params.all();

        team.longtermTime = new Date(team.longtermTime);

        team.sponTime = new Date(team.sponTime);

        Team.create(team, function teamCreated(err, team) {
            if (err) {
                console.log(err);

                req.session.flash = {
                    err: err
                };

                return res.redirect('team/new');
            }

            res.redirect('team/show/' + team.id);
        });

    },

    show: function(req, res, next) {
        var team = req.allParams();

        Team.findOne({
            id: team.id
        }).exec(function(err, team) {
            if (err) return next(err);
            if (!team) return next();

            var moment = require('moment');
            res.view({
                team: team,
                moment: moment
            });
        });
    },

    edit: function(req, res, next) {
        Team.findOne({
            id: req.param('id')
        }, function foundTeam(err, team) {
            if (err) return next(err);
            if (!team) return next('Team does\'t exist');

            res.view({
                team: team
            });
        });
    },

    update: function(req, res, next) {
        var updatedTeam = req.params.all();

        Team.update({
            id: req.param('id')
        }, updatedTeam, function teamUpdated(err) {
            if (err) {
                req.session.err = err;
                return res.redirect('/team/edit/' + req.param('id'));
            }

            res.redirect('/team/show/' + req.param('id'));
        });
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
                    req.session.err = err;
                }

                res.redirect('/team/show/' + req.param('id'));
            });
    },

    destroy: function(req, res, next) {
        Team.findOne({
            id: req.param('id')
        }, function foundUser(err, team) {
            if (err) return next(err);

            if (!team) return next('Team does\'t exist');

            Team.destroy({
                _id: req.param('id')
            }, function teamDestroyed(err) {
                if (err) return next(err);
            });

            res.redirect('/team');
        });
    }

};
