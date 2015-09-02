(function() {
  'use strict';
  angular.module('app.problem')
    .directive('venueList', VenueListDirective);
  
  //VenueListDirective.$inject = [''];
  
  /* @ngInject */
  function VenueListDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/problem/venue-list.html',
      scope: {
        venue: '=',
        selectedItem: '=',
        options: '=',
      },
      controller: ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.select = function(id, item) {
          item.getName = function(){
            return this.assoc + ' - ' + this.year + ' ' + this.name;
          };
      
          $rootScope.selectedTournament = item;
        };
      }]
    };
    return directive;
  }
})();
