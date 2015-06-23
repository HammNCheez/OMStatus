(function() {
  'use strict';
  angular
    .module('app.tournament')
    .controller('TournamentController', TournamentController);

  TournamentController.$inject = ['$rootScope', 'tournamentsFactory'];
  
  /* @ngInject */
  function TournamentController($rootScope, tournamentsFactory) {
    var vm = this;
    vm.tournaments = tournamentsFactory.vals;
    vm.selectedTournament = $rootScope.selectedTournament;
  }
})();
