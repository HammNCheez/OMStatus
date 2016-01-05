(function() {
  'use strict';
  angular
    .module('app.problem')
    .controller('AddProbController', AddProbController);
  AddProbController.$inject = ['$uibModalInstance', '$http', 'problems'];
  /* @ngInject */
  function AddProbController($uibModalInstance, $http, problems) {

    var vm = this;
    vm.problems = problems;
    vm.prob = {year: new Date().getFullYear()};
    vm.ok = ok;
    vm.cancel = cancel;
    vm.tournaments = [];
    
    function ok() {
      $uibModalInstance.close(vm.prob);
    };

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    };
    
    function loadTournaments() {      
      $http.get('/api/tournaments').success(
        function(data) {
          _.forEach(data, function(value){
            vm.tournaments.push({id:value._id, name:value.name});
          });
        });
    };
    
    loadTournaments();
  };
})();
