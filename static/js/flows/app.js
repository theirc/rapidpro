(function() {
  var app;

  app = angular.module('app', ['ui.sortable', 'ui.bootstrap', 'ngAnimate', 'angularFileUpload', 'monospaced.elastic', 'temba.validation', 'temba.services', 'temba.controllers', 'temba.directives', 'temba.widgets']);

  app.config([
    '$httpProvider', '$sceDelegateProvider', function($httpProvider, $sceDelegateProvider) {
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      return $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://*.s3.amazonaws.com/**', 'https://*.s3.amazonaws.com/**', 'http://textit.ngrok.com/**']);
    }
  ]);

  app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol("[[");
    return $interpolateProvider.endSymbol("]]");
  });

}).call(this);
