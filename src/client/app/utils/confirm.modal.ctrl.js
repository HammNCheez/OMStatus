(function() {
  'use strict';
  angular
    .module('app.utils')
    .controller('ConfirmController', ConfirmController);
  ConfirmController.$inject = ['$uibModalInstance', 'message'];
  /* @ngInject */
  function ConfirmController($uibModalInstance, message) {

    var vm = this;
    vm.message = message;

    vm.ok = function () {
      $uibModalInstance.close('success');
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  };
})();
