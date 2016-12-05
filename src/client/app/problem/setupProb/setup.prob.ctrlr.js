(function() {
  'use strict';
  angular
    .module('app.problem')
    .controller('SetupProbsController', SetupProbsController);

  SetupProbsController.$inject = ['crudFactory', '$http', '$uibModal', '$log'];

  /* @ngInject */
  function SetupProbsController(crudFactory, $http,  $uibModal, $log) {
    var vm = this;

    var problemFactory = new crudFactory('problems');
    problemFactory.getAll.then(function(problems){
      vm.problems = problems;
    });

    //load up scope
    var vm = this;
    vm.addProblem = addProblem;
    vm.saveProblem = saveProblem;
    vm.editProblem = editProblem;
    //vm.removeMembership = removeMembership;
    //vm.confirmDelete = confirmDelete;

    function shout(message){
      alert(message);
    };
    
    function addProblem() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/problem/setupProb/addProb.html',
        controller: 'AddProbController',
        controllerAs: 'vm',
        size: 'lg',
        backdrop: 'static',
        resolve: {
           problem: function(){
             return null;
           }
        }
      });

      modalInstance.result.then(function (problem) {
        $log.debug(JSON.stringify(problem));
        vm.problems.data.push(problem);
        vm.saveProblem(problem, vm.problems.data.length -1);
      }, function(message){$log.debug('Modal dismissed at ' + new Date())});
      
    };

    function saveProblem(data, index) {
//       if(problemId && problemId != -1){ //Save Existing Problem
//         angular.extend(data, {_id: problemId});

//         problemFactory.update(data).then(
//           function(result){
//             $log.debug('Problem %s successfully updated.', data._id);
//           },
//           function(error){
//             $log.error('An error occured while updating problem' +
//                        '\nMessage: ' + error.data.message + 
//                        '\nResult: ' + JSON.stringify(error));
//           }
//         );

//       } else { //Save New Problem
      var newProb = {name: data.name,
                    number: data.number,
                    year: data.year,
                    tournament: data.tournament.id};
      problemFactory.add(newProb).then(
        function(result){
          $log.debug('Problem successfully added with ID %s', result.data._id);
          vm.problems.data[index]._id =  result.data._id;
        },
        function(error){
          $log.error('An error occured while saving new problem' +
                     '\nMessage: ' + error.data.message + 
                     '\nResult: ' + JSON.stringify(error));
        });
//     }
    };
    
    function editProblem(problemData){
       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'app/problem/setupProb/addProb.html',
         controller: 'AddProbController',
         controllerAs: 'vm',
         size: 'lg',
         backdrop: 'static',
         resolve: {
           problem: function(){
             return problemData;
           }
         }
       });

      modalInstance.result.then(function (problem) {
        $log.debug(JSON.stringify(problem));
        //vm.problems.data.push(problem);
        //vm.saveProblem(problem, vm.problems.data.length -1);
      }, function(message){$log.debug('Modal dismissed at ' + new Date())});
      
    };

//     function confirmDelete(membershipId, index) {

//       var modalInstance = $uibModal.open({
//         animation: true,
//         templateUrl: 'app/utils/confirm.modal.html',
//         controller: 'ConfirmController',
//         controllerAs: 'vm',
//         //size: '',
//         resolve: {
//           message: function () {
//             return 'Are you sure you want to delete this membership?';
//           }
//         }
//       });

//       modalInstance.result.then(function (message) {
//         removeMembership(membershipId, index);
//       });
//     };

//     function removeMembership(membershipId, index) {
//       var delMembership = vm.memberships.data[index];

//       vm.memberships.data.splice(index, 1);

//       if(membershipId !== -1){
//         membershipFactory.remove(membershipId).then(
//           function(result){
//             $log.debug('Membership %s successfully removed', membershipId);
//           },
//           function(error){
//             $log.error('An error occured while removing membership' +
//                        '\nMessage: ' + error.data.message + 
//                        '\nResult: ' + JSON.stringify(error));
//             //put it back in
//             vm.memberships.data.splice(index, 0, delMembership);
//           }
//         );
//       }
//     };
  };
})();
