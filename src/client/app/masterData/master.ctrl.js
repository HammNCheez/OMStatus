(function() {
  'use strict';
  angular
    .module('app.master')
    .controller('MasterDataController', MasterDataController);

  MasterDataController.$inject = ['crudFactory', '$uibModal', '$log'];

  /* @ngInject */
  function MasterDataController(crudFactory, $uibModal, $log) {
    var vm = this;

    var assocFactory = new crudFactory('assoc');
    assocFactory.getAll.then(function(assocs){
      vm.assocs = assocs;
    });

    //load up scope
    var vm = this;
    vm.addAssoc = addAssocToTable;
    vm.saveAssoc = saveAssoc;
    vm.removeAssoc = removeAssoc;
    vm.confirmDelete = confirmDelete;
    vm.cancelEdit = cancelEdit;

    function addAssocToTable() {
      vm.inserted = {
        _id : -1,
        name : ''
      };
      vm.assocs.data.push(vm.inserted);
    };

    function saveAssoc(data, assocId, index) {
      if(assocId && assocId != -1){ //Save Existing Association
        angular.extend(data, {_id: assocId});

        assocFactory.update(data).then(
          function(result){
            $log.debug('Association %s successfully updated.', data._id);
          },
          function(error){
            $log.error('An error occured while updating association' +
                       '\nMessage: ' + error.data.message + 
                       '\nResult: ' + JSON.stringify(error));
          }
        );

      } else { //Save New Association
        assocFactory.add(data).then(
          function(result){
            $log.debug('Association successfully added with ID %s', result.data._id);
            vm.assocs.data[index]._id =  result.data._id;
          },
          function(error){
            $log.error('An error occured while saving new association' +
                       '\nMessage: ' + error.data.message + 
                       '\nResult: ' + JSON.stringify(error));
          });
      }
    };

    function confirmDelete(assocId, index) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/utils/confirm.modal.html',
        controller: 'ConfirmController',
        controllerAs: 'vm',
        resolve: {
          message: function () {
            return 'Are you sure you want to delete this association?';
          }
        }
      });

      modalInstance.result.then(function (message) {
        removeAssoc(assocId, index);
      });
    };

    function removeAssoc(assocId, index) {
      var delAssoc = vm.assocs.data[index];

      vm.assocs.data.splice(index, 1);

      if(assocId !== -1){
        assocFactory.remove(assocId).then(
          function(result){
            $log.debug('Association %s successfully removed', assocId);
          },
          function(error){
            $log.error('An error occured while removing association' +
                       '\nMessage: ' + error.data.message + 
                       '\nResult: ' + JSON.stringify(error));
            //put it back in
            vm.assocs.data.splice(index, 0, delAssoc);
          }
        );
      }
    };
    
    function cancelEdit(id, index){      
      if(id === -1)
        vm.assocs.data.splice(index, 1);
    };
  };
})();
