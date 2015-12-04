(function() {
  'use strict';

  angular
    .module('app.membership')
    .config(config) //Restangular Config
    .factory('membershipFactory', MembershipFactory);
  
  MembershipFactory.$inject = ['RestangularProvider'];
  
  /* @ngInject */
  function config (RestangularProvider){
    RestangularProvider.setFullResponse(true);
    //RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
  };
  
  MembershipFactory.$inject = ['Restangular'];
  
  /* @ngInject */
  function MembershipFactory(Restangular) {

    var membershipAPI = Restangular.all('api/memberships');    

    var service = {
      getAll: membershipAPI.getList(),
      getById: getMembershipById,
      add: addMembership,
      update: updateMembership,
      remove: removeMembership
    };

    return service;
    
    function getMembershipById(membershipId){
      return membershipAPI.one(membershipId).get();
    }

    function addMembership(membership) {
      return membershipAPI.post(membership);
    }

    function updateMembership(membership) {
      return membershipAPI.one(membership._id).customPUT(membership);
    }
    
    function removeMembership(membershipId) {
      return membershipAPI.one(membershipId).remove();
    }
  }
})();
