(function() {
  'use strict';
  angular
    .module('app.tournament')
    .controller('TournamentController', TournamentController);

  TournamentController.$inject = ['$log', '$rootScope', '$http', '$filter', '$uibModal', 'crudFactory', 'levels'];

  /* @ngInject */
  function TournamentController($log, $rootScope, $http, $filter, $uibModal, crudFactory, levels) {
    var vm = this;

    var tournamentsFactory = new crudFactory('tournaments');
    tournamentsFactory.getAll.then(function(tournaments){
      vm.tournaments = tournaments;
    });

    vm.assocs = [];
    vm.levels = levels;
    vm.showLevel = showLevel;
    vm.loadAssocs = loadAssocs;
    vm.properCase = toProperCase;
    vm.addTournament = addTournament;
    vm.saveTournament = saveTournament;
    vm.confirmDelete = confirmDelete;
    vm.removeTournament = removeTournament;
    

    function loadAssocs() {
      return vm.assocs.length ? null : $http.get('/api/assoc').success(
        function(data) {
          _.forEach(data, function(value){
            vm.assocs.push(
              {value:value.name, text:_.startCase(value.name.toLowerCase())}
            );
          });
        });
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
    
    function addTournament() {
      
      //check that there isnt an unsaved tournament in the group yet. If so then dont add another.
      if(_.find(vm.tournaments.data, '_id', -1))
        $log.debug("Already unsaved tournament in list. Won't add another.");
      else {
        vm.inserted = {
          _id : -1,
          name : 'New Tournament',
          assoc : '',
          level : 0,
          date : new Date(),
          year : new Date().getFullYear(),
          location : {
            name : '',
            address: {
              street: '',
              city: '',
              state: '',
              zip: ''
            }
          }
        };
        vm.tournaments.data.push(vm.inserted);
      }
    };
    
    function saveTournament(data, tournamentId, index) {
      if(tournamentId && tournamentId != -1){ //Save Existing Tournament        
        //add the id and put the location data in the right spot
        angular.extend(data, 
                       {_id: tournamentId,
                        location :{
                         name : data.locName,
                         address : {
                           street : data.street,
                           city : data.city,
                           state : data.state,
                           zip : data.zip
                         }
                       }});
        delete data.locName;
        delete data.street;
        delete data.city;
        delete data.state;
        delete data.zip;

        tournamentsFactory.update(data).then(
          function(result){
            $log.debug('Tournament %s successfully updated.', data._id);
          },
          function(error){
            $log.error('An error occured while updating tournament' +
                       '\nMessage: ' + error.data.message + 
                       '\nResult: ' + JSON.stringify(error));
          }
        );

      } else { //Save New Tournament
        tournamentsFactory.add(data).then(
          function(result){
            $log.debug('Membership successfully added with ID %s', result.data._id);
            vm.tournaments.data[index]._id =  result.data._id;
          },
          function(error){
            $log.error('An error occured while saving new tournament' +
                       '\nMessage: ' + error.data.message + 
                       '\nResult: ' + JSON.stringify(error));
          });
      }
    };
    
    function confirmDelete(tournamentId, index) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/utils/confirm.html',
        controller: 'ConfirmController',
        controllerAs: 'vm',
        //size: '',
        resolve: {
          message: function () {
            return 'Are you sure you want to delete this tournament?';
          }
        }
      });

      modalInstance.result.then(function (message) {
        removeTournament(tournamentId, index);
      });
    };
    
    function removeTournament(tournamentId, index){
      var delTournament = vm.tournaments.data[index];

      vm.tournaments.data.splice(index, 1);

      if(tournamentId !== -1){
        tournamentsFactory.remove(tournamentId).then(
          function(result){
            $log.debug('Tournament %s successfully removed', tournamentId);
          },
          function(error){
            $log.error('An error occured while removing tournament' +
                       '\nMessage: ' + error.data.message + 
                       '\nResult: ' + JSON.stringify(error));
            //put it back in
            vm.tournaments.data.splice(index, 0, delTournament);
          }
        );
      }
    };
    
  };
})();
