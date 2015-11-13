module.exports = {
  ip: process.env.OPENSHIFT_NODEJS_IP || undefined,
  mongo: {
    uri: 'mongodb://localhost/om'
  }
};
