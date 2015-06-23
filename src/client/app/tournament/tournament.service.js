(function() {
  'use strict';

  angular
    .module('app.tournament')
    .factory('tournamentsFactory', TournamentsFactory);
  
  TournamentsFactory.$inject = ['$firebaseArray', 'firebaseURL'];
  
  /* @ngInject */
  function TournamentsFactory($firebaseArray, firebaseURL) {
    var ref = new Firebase(firebaseURL + '/tournaments').orderByChild('date');
    var obj = $firebaseArray(ref);
    var service = {
      vals: obj,
      add: addData,
      //update: updateData,
      remove: removeIndex
    };

    return service;

    function addData(data) {
      return obj.$add(data);
    }

    function removeIndex(index) {
      return obj.$remove(index);
    }
  }
})();
