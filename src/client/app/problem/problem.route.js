(function() {
  'use strict';
  angular
    .module('app.problem')
    .run(appRun);
  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'problem',
      config: {
        url: '/problem/:probId',
        templateUrl: 'app/problem/problem.html',
        controller: 'ProblemController',
        controllerAs: 'vm',
        title: 'Problem',
        settings: {
          titleSuffix: 'probId'
        }
      }
    }];
  }
})();