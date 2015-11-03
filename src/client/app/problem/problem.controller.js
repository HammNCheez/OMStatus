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
        vm.teams.forEach(logElement);
      });
      
    function logElement(element, index, array){
      console.log('ID:' + element.$id);
      console.log(JSON.stringify(element, null, '\t'));
    };
  }
})();
