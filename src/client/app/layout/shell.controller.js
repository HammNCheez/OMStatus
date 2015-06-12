(function() {
  'use strict';
  angular
    .module('app.layout')
    .controller('ShellController', ShellController);
  ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
  /* @ngInject */
  function ShellController($rootScope, $timeout, config, logger) {
    var vm = this;
  }
})();
