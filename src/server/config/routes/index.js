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
   console.log(chalk.yellow('Configuring :') + chalk.yellow.bgRed('Association Routes'));
  var assoc = route('assoc');
  app.get('/api/assoc', assoc.list);
  app.post('/api/assoc', utils.body('name'), assoc.create);
  app.put('/api/assoc/:id', assoc.update);
  app.delete('/api/assoc/:id', assoc.delete);
  
  console.log(chalk.yellow('Configuring :') + chalk.yellow.bgRed('Tournament Routes'));
  var tournaments = route('tournaments');
  app.get('/api/tournaments', tournaments.list);
  app.get('/api/tournaments/:id', tournaments.getOne);
  app.post('/api/tournaments', utils.body('name assoc year level date'), tournaments.create);
  app.put('/api/tournaments/:id', tournaments.update);
  app.delete('/api/tournaments/:id', tournaments.delete);
  
  console.log(chalk.yellow('Configuring :') + chalk.yellow.bgRed('Membership Routes'));
  var memberships = route('memberships');
  app.get('/api/memberships', memberships.list);
  app.get('/api/memberships/:division', memberships.byDiv);
  app.get('/api/memberships/:assoc/:division', memberships.byAssocDiv);
  app.get('/api/memberships/:id', memberships.getOne);
  app.post('/api/memberships', utils.body('name number assoc division year'), memberships.create);
  app.put('/api/memberships/:id', memberships.update);
  app.delete('/api/memberships/:id', memberships.delete);

  console.log(chalk.yellow('Configuring :') + chalk.yellow.bgRed('Problem Routes'));
  var problems = route('problems');
  app.get('/api/problems', problems.list);
  app.get('/api/problems/:probNum/:tournament', problems.byTournament);
//   app.get('/api/problems/:id', problems.getOne);
  app.post('/api/problems', utils.body('name number year tournament'), problems.create);
  app.post('/api/problems/:id', utils.body('name sortOrder'), problems.addVenue);
//   app.put('/api/problems/:id', problems.update);
  app.delete('/api/problems/:id', problems.delete);
  
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
