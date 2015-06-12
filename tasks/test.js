'use strict';

/**
 * Test tasks
 */

var chalk      = require('chalk');
var karma      = require('karma').server;

/**
 * Log. With options.
 *
 * @param {String} msg
 * @param {Object} options
 */
function log (msg, options) {
  options = options || {};
  console.log(
    (options.padding ? '\n' : '')
    + chalk.yellow(' > ' + msg)
    + (options.padding ? '\n' : '')
  );
}

function testServer (done) {

  log('Running server tests...', { padding: true });

  done();

}

function testClient (done) {

  log('Running client tests...', { padding: true });

  karma.start({
    configFile: __dirname + '/../karma.conf.js'
  }, function () { done(); });
}

exports.test = function (done) {
  process.env.NODE_ENV = 'test';
  var arg = process.argv[3] ? process.argv[3].substr(2) : false;
  if (arg === 'client') {
    return testClient(done);
  } else if (arg === 'server') {
    return testServer(function () {
      done();
      process.exit();
    });
  } else if (arg === false) {
    return testClient(function () {
      testServer(function () {
        done();
        process.exit();
      });
    });
  } else {
    console.log('Wrong parameter [%s], availables : --client, --server', arg);
  }
};
