(function() {
  'use strict';

  angular
    .module('app.utils')
    .config(config) //Restangular Config
    .factory('crudFactory', CRUDFactory);
  
  CRUDFactory.$inject = ['RestangularProvider'];
  
  /* @ngInject */
  function config (RestangularProvider){
    RestangularProvider.setFullResponse(true);
    //RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
  };
  
  CRUDFactory.$inject = ['Restangular'];
  
  /* @ngInject */
  function CRUDFactory(Restangular) {

    

    var service = function(apiPath){
      this.apiReference = Restangular.all('api/' + apiPath);
      this.getAll = this.apiReference.getList();
      this.getById = getItemById;
      this.add = addItem;
      this.update = updateItem;
      this.remove = removeItem;
    };

    return service;
    
    function getItemById(itemId){
      return this.apiReference.one(itemId).get();
    }

    function addItem(item) {
      return this.apiReference.post(item);
    }

    function updateItem(item) {
      return this.apiReference.one(item._id).customPUT(item);
    }
    
    function removeItem(itemId) {
      return this.apiReference.one(itemId).remove();
    }
  }
})();
