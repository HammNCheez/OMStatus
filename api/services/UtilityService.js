// Utility services to use in controllers

var _ = require('underscore');
var moment = require('moment');

module.exports = {

  isValidUserForProblem: function(team, user) {
    if (team && user) {
      if ((team.problem === 'P' && _.indexOf(user.roles, 'primary') > -1) || (team.problem === '1' && _.indexOf(user.roles, 'problem1') > -1) || (team.problem === '2' && _.indexOf(user.roles, 'problem2') > -1) || (team.problem === '3' && _.indexOf(user.roles, 'problem3') > -1) || (team.problem === '4' && _.indexOf(user.roles, 'problem4') > -1) || (team.problem === '5' && _.indexOf(user.roles, 'problem5') > -1)) {
        return true;
      }
    }
    return false;
  },

  hasRole: function(user, role) {
    if (user && _.indexOf(user.roles, role) > -1) {
      return true;
    }
    return false;
  },

  getTime: function(date){
    if(!date)
        return '';

    return moment(date).format('h:mm a');
  }
};
