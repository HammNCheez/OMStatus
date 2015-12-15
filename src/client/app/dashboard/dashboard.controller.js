(function() {
  'use strict';
  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$rootScope', 'crudFactory'];

  /* @ngInject */
  function DashboardController($rootScope, crudFactory) {
    var vm = this;
    
  }
})();
