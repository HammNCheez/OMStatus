(function() {
  'use strict';
  angular
    .module('app.membership')
    .run(appRun);
  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'memberships',
      config: {
        url: '/memberships',
        templateUrl: 'app/membership/membership.html',
        controller: 'MembershipController',
        controllerAs: 'vm',
        title: 'Memberships'
      }
    }];
  }
})();