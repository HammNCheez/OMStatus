(function() {
  'use strict';
  angular
    .module('app.tournament')
    .controller('TournamentController', TournamentController);

  TournamentController.$inject = ['$log', '$rootScope', 'crudFactory', 'levels'];

  /* @ngInject */
  function TournamentController($log, $rootScope, crudFactory, levels) {
    var vm = this;

    var tournamentsFactory = new crudFactory('tournaments');
    tournamentsFactory.getAll.then(function(tournaments){
      vm.tournaments = tournaments;
    });

    vm.showDetailRow = showDetailRow;
    vm.showLevel = showLevel;

    function showLevel(level){
      if(level && levels.length){
        var lvl = _.find(levels, _.matchesProperty('value', level));
        if(lvl)
          return lvl.text;

        return undefined;
      }
    };

    function showDetailRow(tournamentId){
     $log.debug('ShowDetails: %s', tournamentId);
      if (vm.active != tournamentId) {
        vm.active = tournamentId;
      }
      else {
        vm.active = null;
      }
    }
  };
})();
