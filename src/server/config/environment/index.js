var path = require('path'),
 _ = require('lodash');

var all = {

  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../../..'),
  port: process.env.OPENSHIFT_NODEJS_PORT || 3000,

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

module.exports = _.merge(all, require('./' + all.env + '.js'));
