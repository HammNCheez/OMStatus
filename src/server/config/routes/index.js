'use strict';

var config = require('../environment'),
    chalk = require('chalk'),
    path = require('path');

module.exports = function (app, db) {
  var utils = require(path.join(__dirname,'..','..', '/lib/utils'))(db);

  
  function route(name) {
    return require(path.join(__dirname, name))(db, utils);
  }
  
  // API
  console.log(chalk.yellow('Configuring :') + chalk.yellow.bgRed('API'));
  var api = route('api');
  app.get('/api/tournaments', api.list);

  // Base Routes
  console.log(chalk.yellow('Configuring :') + chalk.yellow.bgRed('Base Routes'));
  app.get('/*', function (req, res) {
    console.log('originalUrl: ' + req.originalUrl);
    res.sendFile(app.get('appPath') + '/index.html', {root: config.root });
  });
  app.put('*',    function (req, res) { utils.error(res, 404, 'Invalid PUT request')});
  app.post('*',   function (req, res) { utils.error(res, 404, 'Invalid POST request')});
  app.delete('*', function (req, res) { utils.error(res, 404, 'Invalid DELETE request')});
};
