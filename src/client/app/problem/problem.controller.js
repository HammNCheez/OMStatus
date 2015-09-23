(function() {
  'use strict';
  angular
    .module('app.problem')
    .controller('ProblemController', ProblemController, 'problemService');

  function ProblemController($stateParams, $rootScope, problemService) {
    var vm = this;
    vm.probId = $stateParams.probId;
    vm.title = 'Problem ' + vm.probId;
    vm.tourney = $rootScope.selectedTournament;
    
    if(vm.tourney)
      vm.teams = problemService.getTeamsForTournament(vm.probId, vm.tourney.$id);
    
    vm.teams.$loaded()
      .then(function(list){
        console.log(JSON.stringify(list, null, '\t'));
      });
  }
})();
