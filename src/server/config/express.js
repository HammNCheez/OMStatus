'use strict';

var express = require('express'),
    compression = require('compression'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon');

var config = require('./environment');

module.exports = function (app) {

  var env = config.env;

  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(favicon(__dirname + '/favicon.ico'));
  app.use(compression());
  app.use(morgan('dev'));
  app.use(express.static(path.join(config.root, 'src/client')));
  app.use('/bower_components', express.static(path.join(config.root, 'bower_components')));
  app.use('/assets', express.static(path.join(config.root, 'assets')));
  app.set('appPath', 'src/client');


  if (env === 'development' || env === 'test') {
    app.use(require('errorhandler')());
  }

};