(function() {
  'use strict';
  angular
    .module('app.master', [
      'app.core',
      'app.utils',
      'xeditable'
  ]).run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });
})();
