(function() {
  'use strict';
  angular
    .module('app.tournament')
    .run(appRun);
  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'tournaments',
      config: {
        url: '/tournaments',
        templateUrl: 'app/tournament/tournament.html',
        controller: 'TournamentController',
        controllerAs: 'vm',
        title: 'Tournaments'
      }
    }];
  }
})();