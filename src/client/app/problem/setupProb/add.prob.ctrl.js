(function() {
  'use strict';
  angular
    .module('app.problem')
    .controller('AddProbController', AddProbController);
  AddProbController.$inject = ['$uibModalInstance', '$uibModal', '$http', 'problems'];
  /* @ngInject */
  function AddProbController($uibModalInstance, $uibModal, $http, problems) {

    var vm = this;
    vm.problems = problems;
    vm.prob = {year: new Date().getFullYear()};
    vm.ok = ok;
    vm.cancel = cancel;
    vm.tournaments = [];
    
    function ok() {
      console.log(JSON.stringify(vm.prob));
      
      //check for name/tournament problem and year
      if(!vm.prob.name){
        alertModal('You must provide a problem name.');
      } else if(!vm.prob.tournament){
        alertModal('You must select a tournament.');
      } else if(!vm.prob.number){
        alertModal('You must select a problem.');
      } else if(!vm.prob.year){
        alertModal('You must provide a problem year.');
      } else {
        $uibModalInstance.close(vm.prob);
      }
    };

    function cancel() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/utils/confirm.modal.html',
        controller: 'ConfirmController',
        controllerAs: 'vm',
        //size: '',
        resolve: {
          message: function () {
            return 'Are you sure you want to cancel adding a new problem? You will lose all unsaved data.';
          }
        }
      });

      modalInstance.result.then(function (message) {
        $uibModalInstance.dismiss('cancel');
      });
    };
    
    function loadTournaments() {      
      $http.get('/api/tournaments').success(
        function(data) {
          _.forEach(data, function(value){
            vm.tournaments.push({id:value._id, name:value.name});
          });
        });
    };
    
    function alertModal(message){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/utils/alert.modal.html',
        controller: 'AlertController',
        controllerAs: 'vm',
        //size: '',
        resolve: {
          message: function () {
            return message;
          }
        }
      });
    };
    
    loadTournaments();
  };
})();
