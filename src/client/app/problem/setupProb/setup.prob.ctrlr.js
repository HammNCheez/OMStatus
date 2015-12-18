(function() {
  'use strict';
  angular
    .module('app.membership')
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
    vm.shout = shout;
    vm.addProblem = addProblem;
    //vm.saveMembership = saveMembership;
    //vm.removeMembership = removeMembership;
    //vm.confirmDelete = confirmDelete;

    function shout(message){
      alert(message);
    };
    
    function addProblem() {
      $log.debug('1');
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/problem/setupProb/addProb.html',
        controller: 'AddProbController',
        controllerAs: 'vm',
        size: 'lg'
      });

      modalInstance.result.then(function (problem) {
        vm.problems.data.push(problem);
      }, function(message){$log.debug('Modal dismissed at ' + new Date())});
      
    };

//     function saveMembership(data, membershipId, index) {
//       if(membershipId && membershipId != -1){ //Save Existing Membership
//         angular.extend(data, {_id: membershipId});

//         membershipFactory.update(data).then(
//           function(result){
//             $log.debug('Membership %s successfully updated.', data._id);
//           },
//           function(error){
//             $log.error('An error occured while updating membership' +
//                        '\nMessage: ' + error.data.message + 
//                        '\nResult: ' + JSON.stringify(error));
//           }
//         );

//       } else { //Save New Membership
//         membershipFactory.add(data).then(
//           function(result){
//             $log.debug('Membership successfully added with ID %s', result.data._id);
//             vm.memberships.data[index]._id =  result.data._id;
//           },
//           function(error){
//             $log.error('An error occured while saving new membership' +
//                        '\nMessage: ' + error.data.message + 
//                        '\nResult: ' + JSON.stringify(error));
//           });
//       }
//     };

//     function confirmDelete(membershipId, index) {

//       var modalInstance = $uibModal.open({
//         animation: true,
//         templateUrl: 'app/utils/confirm.html',
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
