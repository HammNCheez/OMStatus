(function() {
  'use strict';
  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  function DashboardController() {
    var vm = this;
    vm.messageCount = 7;
    vm.people = [];
    vm.name = 'Jony';
    vm.title = 'Dashboard';

    function getMessageCount() {
      vm.messageCount++;
      return vm.messageCount;
    }
  }
})();
