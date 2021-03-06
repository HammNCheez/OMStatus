(function() {
  'use strict';
  angular
    .module('app.utils')
    .filter('stringFormat', stringFormat)
    .filter('properCase', properCase);

  /* @ngInject */
  function stringFormat(){
    return function (template, values) {
      if (!values || !values.length || !template) {
        return template;
      }
      return toFormattedString(false, template, values);
    };
  };
  
  /* @ngInject */
  function properCase(){
    return toProperCase;
  }

  function toFormattedString(useLocale, format, values) {
    var result = '';

    for (var i = 0; ; ) {
      // Find the next opening or closing brace
      var open = format.indexOf('{', i);
      var close = format.indexOf('}', i);
      if ((open < 0) && (close < 0)) {
        // Not found: copy the end of the string and break
        result += format.slice(i);
        break;
      }
      if ((close > 0) && ((close < open) || (open < 0))) {

        if (format.charAt(close + 1) !== '}') {
          throw new Error('format stringFormatBraceMismatch');
        }

        result += format.slice(i, close + 1);
        i = close + 2;
        continue;
      }

      // Copy the string before the brace
      result += format.slice(i, open);
      i = open + 1;

      // Check for double braces (which display as one and are not arguments)
      if (format.charAt(i) === '{') {
        result += '{';
        i++;
        continue;
      }

      if (close < 0) throw new Error('format stringFormatBraceMismatch');

      // Find the closing brace

      // Get the string between the braces, and split it around the ':' (if any)
      var brace = format.substring(i, close);
      var colonIndex = brace.indexOf(':');
      var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);

      if (isNaN(argNumber)) throw new Error('format stringFormatInvalid');

      var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);

      var arg = values[argNumber];
      if (typeof (arg) === "undefined" || arg === null) {
        arg = '';
      }

      // If it has a toFormattedString method, call it.  Otherwise, call toString()
      if (arg.toFormattedString) {
        result += arg.toFormattedString(argFormat);
      } else if (useLocale && arg.localeFormat) {
        result += arg.localeFormat(argFormat);
      } else if (arg.format) {
        result += arg.format(argFormat);
      } else
        result += arg.toString();

      i = close + 1;
    }

    return result;
  };
  
  function toProperCase(input){
    var lowered = input.toLowerCase();
    
    return lowered.replace(/\b\w+/g,function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();});
    
  }
})();