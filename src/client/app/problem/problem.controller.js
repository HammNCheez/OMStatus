(function() {
  'use strict';
  angular
    .module('app.problem')
    .controller('ProblemController', ProblemController);

  function ProblemController($stateParams) {
    var vm = this;
    vm.probId = $stateParams.probId;
    vm.title = 'Problem ' + vm.probId;
  }
})();
