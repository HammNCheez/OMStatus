/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  connections: {
    mongodbServer: {
      adapter: 'sails-mongo',
      host: process.env.OPENSHIFT_MONGODB_DB_HOST,
      port: process.env.OPENSHIFT_MONGODB_DB_PORT,
      user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
      password: process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
      database: 'om'
    }
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: process.env.OPENSHIFT_NODEJS_PORT,
  host: process.env.OPENSHIFT_NODEJS_IP,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

};
