/**
 * User.js
 *
 * @description :: This model holds information about a team.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    schoolName: {
      type: 'string',
      required: true
    },
    teamLetter: {
      type: 'string'
    },
    membershipNumber: {
      type: 'integer'
    },
    problem: {
      type: 'string',
      required: true
    },
    division: {
      type: 'string',
      required: true
    },
    venue: {
      type: 'string',
      required: true
    },
    longtermTime: {
      type: 'datetime'
    },
    sponTime: {
      type: 'datetime'
    },
    checkedIn: {
      type: 'datetime'
    },
    performed: {
      type: 'datetime'
    },

    scoresReady: {
      type: 'datetime'
    },
    scoresPickedUpByCoach: {
      type: 'datetime'
    },
    scoresPickedUpByScoreRoom: {
      type: 'datetime'
    },
    scoresAccepted: {
      type: 'datetime'
    },
    sponCheckedIn: {
      type: 'datetime'
    },
    sponCompleted: {
      type: 'datetime'
    }

  }
};
