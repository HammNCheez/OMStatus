'use strict';

var express = require('express'),
    config = require('./config/environment'),
    chalk = require('chalk'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path');

// connect mongoose
mongoose.connect(config.mongo.uri, config.mongo.options);
var conn = mongoose.connection

// mongoose connection 'error'
conn.on('error', function () {
  console.log(chalk.red.bgYellow('\nMongoose failed to connect:'), 
              chalk.yellow(config.mongo.uri));
  mongoose.disconnect();
});

// mongoose connection 'open'
conn.on('open', function () {
  var db = {};
  
  console.log(chalk.yellow('\nMongoose connection opened:'), 
              chalk.yellow.bgRed(config.mongo.uri));
  
  // config mongoose models
  var modelsPath = path.join(__dirname, 'models');
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) 
      db[file.replace('.js', '')] = require(path.join(modelsPath, file))(mongoose, config);
      console.log(chalk.yellow('Initialized Model: ') 
                + chalk.yellow.bgRed(file.replace('.js', '')));
  });

  // create app
  var app   = express();

  // config app
  require('./config/express')(app);
  require('./config/routes')(app, db);

  // serve app
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
});
