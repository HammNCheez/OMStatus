(function() {
  'use strict';
  angular
    .module('app.problem')
    .controller('AddProbController', AddProbController);
  AddProbController.$inject = ['$uibModalInstance'];
  /* @ngInject */
  function AddProbController($uibModalInstance) {

    var vm = this;
    vm.prob = {year: new Date().getFullYear()};

    vm.ok = function () {
      $uibModalInstance.close('success');
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  };
})();
