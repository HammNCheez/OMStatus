'use strict';

var express = require('express'),
    app = express(),
    config = require('./config/environment'),
    chalk = require('chalk');


require('./config/express')(app);
require('./routes')(app);

//mongoose?

app.listen(config.port, config.ip, function() {

    console.log(
        chalk.yellow('\nExpress server listening on port ') 
      + chalk.yellow.bgRed('%d') 
      + chalk.yellow(', in ') 
      + chalk.yellow.bgRed('%s') 
      + chalk.yellow(' mode.\n'),
        config.port,
        app.get('env')
    );


    console.log(chalk.yellow('Base directory: ') + chalk.yellow.bgRed(__dirname));
});
