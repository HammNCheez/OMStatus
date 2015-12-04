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
      state: 'membership',
      config: {
        url: '/membership',
        templateUrl: 'app/membership/membership.html',
        controller: 'MembershipController',
        controllerAs: 'vm',
        title: 'Memberships'
      }
    }];
  }
})();