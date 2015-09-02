(function() {
  'use strict';

  angular
    .module('app.problem')
    .service('problemService', ProblemService);
  
  ProblemService.$inject = ['$firebaseArray', 'firebaseURL'];
  
  /* @ngInject */
  function ProblemService($firebaseArray, firebaseURL) {
    
    
    var refs = {};
    refs['P'] = new Firebase(firebaseURL + '/Primary');
    refs['1'] = new Firebase(firebaseURL + '/p1');
    refs['2'] = new Firebase(firebaseURL + '/p2');
    refs['3'] = new Firebase(firebaseURL + '/p3');
    refs['4'] = new Firebase(firebaseURL + '/p4');
    refs['5'] = new Firebase(firebaseURL + '/p5');
    
    this.getTeamsForTournament = getTeamsForTournament;

    function getTeamsForTournament(probNum, tournamentId) {
      var tournamentRef = refs[probNum].child(tournamentId);
      return $firebaseArray(tournamentRef);
    }
  }
})();
