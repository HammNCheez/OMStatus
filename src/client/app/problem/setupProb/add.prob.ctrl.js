(function() {
  'use strict';
  angular
    .module('app.problem')
    .controller('AddProbController', AddProbController);
  AddProbController.$inject = ['$uibModalInstance', 'problems'];
  /* @ngInject */
  function AddProbController($uibModalInstance, problems) {

    var vm = this;
    vm.problems = problems;
    vm.prob = {year: new Date().getFullYear()};

    vm.ok = function () {
      
      
      $uibModalInstance.close(vm.prob);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  };
})();
