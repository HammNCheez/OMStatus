(function() {
  'use strict';
  angular
    .module('app.membership', [
      'app.core',
      'app.utils',
      'xeditable'
  ]).run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });
})();
