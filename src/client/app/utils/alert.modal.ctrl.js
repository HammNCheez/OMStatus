(function() {
  'use strict';
  angular
    .module('app.utils')
    .controller('AlertController', AlertController);
  AlertController.$inject = ['$uibModalInstance', 'message'];
  /* @ngInject */
  function AlertController($uibModalInstance, message) {

    var vm = this;
    vm.message = message;

    vm.ok = function () {
      $uibModalInstance.close('success');
    };
  };
})();
