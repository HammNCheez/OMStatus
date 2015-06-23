(function() {
  'use strict';
  angular.module('app.firebase').factory('firebaseCRUD', firebaseCRUD);
  firebaseCRUD.$inject = ['firebaseURL', '$firebaseArray'];

  function firebaseCRUD(firebaseURL, $firebaseArray) {
    return function(collectionName) {
      var ref = new Firebase(firebaseURL),
          obj = $firebaseArray(ref);

      var service = {
        val: obj,
        save: addData,
        get: getData,
        update: updateData,
        remove: removeData
      };

      function addData() {
        return '';
      }

      function getData() {
        return '';
      }

      function updateData(data) {
        return '';
      }

      function removeData(data) {
        return '';
      }

      return  service;
    };
  }
})();
