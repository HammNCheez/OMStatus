(function() {
  'use strict';
  angular
    .module('app.core', [
      'ngSanitize', 'blocks.exception', 
      'blocks.logger', 'blocks.router', 'ui.router'
    ]);
})();
