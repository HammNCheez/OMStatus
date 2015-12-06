(function() {
  'use strict';
  angular
    .module('app.membership')
    .controller('MembershipController', MembershipController);

  MembershipController.$inject = ['membershipFactory', '$http', '$uibModal'];

  /* @ngInject */
  function MembershipController(membershipFactory, $http,  $uibModal) {
    var vm = this;
    membershipFactory.getAll.then(function(memberships){
      vm.memberships = memberships;
    });

    //load up scope
    var vm = this;
    vm.divisions = [
      {value: 'P', text: 'Primary'},
      {value: '1', text: 'Division 1'},
      {value: '2', text: 'Division 2'},
      {value: '3', text: 'Division 3'},
      {value: '4', text: 'Division 4'}
    ];
    vm.assocs = [];
    vm.loadAssocs = loadAssocs;
    vm.showDivision = showDivision;
    vm.addMembership = addMembershipToTable;
    vm.saveMembership = saveMembership;
    vm.removeMembership = removeMembership;
    vm.confirmDelete = confirmDelete;

    function loadAssocs() {
      return vm.assocs.length ? null : $http.get('/api/assoc').success(
        function(data) {
          _.forEach(data, function(value){
            vm.assocs.push(
              {value:value.name}
            );
          });
        });
    };

    function showDivision(membership){
      if(membership.division && vm.divisions.length){
        var div = _.find(vm.divisions, _.matchesProperty('value', membership.division));
        if(div)
          return div.text;
        
        return undefined;
      }
    };
    
    function addMembershipToTable() {
      vm.inserted = {
        _id : -1,
        name : '',
        number : '',
        assoc : null,
        division : null,
        year : new Date().getFullYear()
      };
      vm.memberships.data.push(vm.inserted);
    };

    function saveMembership(data, membershipId, index) {
      if(membershipId && membershipId != -1){ //Save Existing User
        angular.extend(data, {_id: membershipId});

        membershipFactory.update(data).then(
          function(result){
            console.log('Membership %s successfully updated.', data._id);
          },
          function(error){
            console.log('Status: ' + error.status);
            console.log('Message: ' + error.data.message);
            console.log('Result: ' + JSON.stringify(error));
          }
        );

      } else { //Save New User
        membershipFactory.add(data).then(
          function(result){
            console.log('Membership successfully added');
            vm.memberships.data[index]._id =  result.data.id;
          },
          function(error){
            console.log('Status: ' + error.status);
            console.log('Message: ' + error.data.message);
            console.log('Result: ' + JSON.stringify(error));
          });
      }
    };

    function confirmDelete(membershipId, index) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/utils/confirm.html',
        controller: 'ConfirmController',
        controllerAs: 'vm',
        //size: '',
        resolve: {
          message: function () {
            return 'delete this membership';
          }
        }
      });
      
      modalInstance.result.then(function (message) {
        removeMembership(membershipId, index);
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
        console.log('Delete Confrim dismissed for %s', membershipId);
      });
    };
    
    function removeMembership(membershipId, index) {
      var delMembership = vm.memberships.data[index];
      
      showDeletePopup(false);
      
      vm.memberships.data.splice(index, 1);

      if(membershipId !== -1){
        membershipFactory.remove(membershipId).then(
          function(result){
            console.log('Membership %s successfully removed', membershipId);
          },
          function(error){
            console.log('Status: ' + error.status);
            console.log('Message: ' + error.data.message);
            console.log('Result: ' + JSON.stringify(error));
            //put it back in
            vm.memberships.data.splice(index, 0, delMembership);
          }
        );
      }
    };
  };
})();
