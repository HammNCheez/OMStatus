(function() {
  'use strict';
  angular.module('app.tournament')
    .directive('tournamentList', TournamentListDirective);
  
  TournamentListDirective.$inject = ['crudFactory'];
  
  /* @ngInject */
  function TournamentListDirective(crudFactory) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/tournament/tournament-list.html',
      scope: {
        //items: '=',
        //selectedItem: '=',
        options: '='
      },
      controller: ['$scope', '$rootScope', '$filter', 'crudFactory', 'levels', function($scope, $rootScope, $filter, crudFactory, levels) {
        var tournamentsFactory = new crudFactory('tournaments');
        
        tournamentsFactory.getAll.then(function(tournaments){
          $scope.tournaments = tournaments;
        });
        
        $scope.select = selectTournament;
        $scope.showLevel = showLevel;
        $scope.toProperCase = toProperCase;

        function selectTournament(item) {
          item.getName = function(){
            return item.name + ' : ' + item.year;
          };

          $rootScope.selectedTournament = item;
        };

        function showLevel(level){
          if((level || level === 0) && levels.length){

            var lvl = _.find(levels, 'value', level);
            if(lvl)
              return lvl.text;

            return undefined;
          }
        };

        function toProperCase(input){
          
          return $filter('properCase')(input);
        };
      }]
    };
    return directive;
  }
})();
