/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('divisions', [
                            {value: 'P', text: 'Primary'},
                            {value: '1', text: 'Division 1'},
                            {value: '2', text: 'Division 2'},
                            {value: '3', text: 'Division 3'},
                            {value: '4', text: 'Division 4'}
                           ])
    .constant('levels', [
                          {value: 0, text: 'Local'},
                          {value: 1, text: 'Region'},
                          {value: 2, text: 'State'},
                          {value: 3, text: 'World'}
                        ])
  .constant('problems', [
                          {value: 'P', text: 'Primary'},
                          {value: '1', text: 'Problem 1'},
                          {value: '2', text: 'Problem 2'},
                          {value: '3', text: 'Problem 3'},
                          {value: '4', text: 'Problem 4'},
                          {value: '5', text: 'Problem 5'}
                        ]);
})();
