(function() {
  'use strict';
  angular
    .module('app.master')
    .run(appRun);
  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'masterdata',
      config: {
        url: '/masterdata',
        templateUrl: 'app/masterData/master.html',
        controller: 'MasterDataController',
        controllerAs: 'vm',
        title: 'Master Data'
      }
    }];
  }
})();