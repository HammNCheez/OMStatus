(function() {
  'use strict';
  angular.module('app.tournament')
    .directive('tournamentList', TournamentListDirective);
  
  TournamentListDirective.$inject = ['tournamentsFactory'];
  
  /* @ngInject */
  function TournamentListDirective(tournamentsFactory) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/tournament/tournament-list.html',
      scope: {
        items: '=',
        selectedItem: '=',
        options: '=',
      },
      controller: ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.select = function(item) {
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
