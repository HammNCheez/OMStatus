(function() {
  'use strict';
  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$rootScope', 'tournamentsFactory'];

  /* @ngInject */
  function DashboardController($rootScope, tournamentsFactory) {
    var vm = this;
    vm.tournaments = tournamentsFactory.vals;
    vm.addTournament = addTournament;
    vm.setTournament = setTournament;

    function addTournament() {
      var newTourney = {
        year: 2016,
        level: 1,
        name: 'Houston Region',
        assoc: 'Texas',
        date: new Date('2016-03-12').toJSON(),
        location: {
          name: 'Paul Revere Middle School',
          address: '123 Briar Forest Rd. Houston, Tx 77042'
        }
      };
      tournamentsFactory.add(newTourney);
    }

    function setTournament(tournament) {
      //console.log(tournament);

      tournament.getName = function(){
        return this.assoc + ' - ' + this.year + ' ' + this.name;
      };
      
      $rootScope.selectedTournament = tournament;
    }
  }
})();
