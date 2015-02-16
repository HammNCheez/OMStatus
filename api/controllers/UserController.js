/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  'new': function(req, res) {
    res.view();
  },

  'create': function(req, res) {
    User.create(req.params.all()).exec(function(err, user) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        };

        return res.redirect('user/new');
      }

      //log user in
      req.session.authenticated = true;
      req.session.user = user;

      res.redirect('user/show/' + user.id);
    });

  },

  show: function(req, res, next) {
    User.findOne({
      id: req.param('id')
    }).exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next();
      var _ = require("underscore");
      res.view({
        user: user,
        _: _,
        host: process.env.OPENSHIFT_MONGODB_DB_HOST,
        port: process.env.OPENSHIFT_MONGODB_DB_PORT,
        user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
        password: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
      });
    });
  },

  index: function(req, res, next) {
    User.find().exec(function(err, users) {
      if (err) return next(err);

      res.view({
        users: users
      });
    });
  },

  edit: function(req, res, next) {
    User.findOne({
      id: req.param('id')
    }).exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next('User does\'t exist');

      res.view({
        user: user
      });
    });
  },

  update: function(req, res, next) {
    var updatedUser = req.params.all();

    User.update({
      id: req.param('id')
    }, updatedUser).exec(function(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {
    User.findOne({
      id: req.param('id')
    }).exec(function(err, user) {
      if (err) return next(err);

      if (!user) return next('User does\'t exist');

      User.destroy({
        id: req.param('id')
      }).exec(function(err) {
        if (err) return next(err);
      });

      res.redirect('/user');
    });
  }
};
