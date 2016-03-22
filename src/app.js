'use strict';


angular.module('com.fianbakken.angular.bootstrap.web.templates', []);
angular.module('com.fianbakken.angular.bootstrap.web.translations', ['pascalprecht.translate']);

var app = angular.module('com.fianbakken.angular.bootstrap.web', [
  'com.fianbakken.angular.bootstrap.web.templates',
  'com.fianbakken.angular.bootstrap.web.translations',
  'ajoslin.promise-tracker',
  'ngSanitize',
  'pascalprecht.translate',
  'ngAnimate',
  'ngCookies',
  'ui.router',
  'ui.validate',
  'cgBusy',
]);

/* jshint ignore:start */
app.constant('modernizr', {});
/* jshint ignore:end */


app.config(function ($urlRouterProvider, $translateProvider, $logProvider) {
  $logProvider.debugEnabled(true);
  $urlRouterProvider.otherwise('/dashboard');
  $translateProvider.preferredLanguage('nb-no').fallbackLanguage('nb-no');
}).run(function ($rootScope, loadingTracker, $q, productRules) {
  $rootScope.productRules = productRules;
  // Wrap active state of loadingTracker (promiseTracker) in a promise
  // that cg-busy directive will use
  var deferred = $q.defer();
  deferred.resolve();
  $rootScope.loadingPromise = deferred.promise;
  $rootScope.$watch(loadingTracker.active, function (isActive) {
    if (isActive) {
      deferred = $q.defer();
      $rootScope.loadingPromise = deferred.promise;
    }
    else {
      deferred.resolve({});
    }
  });

});

// Handle JS-errors
app.factory('$exceptionHandler', function($log) {

  return function(exception) {
    $log.error(exception.message, exception);
  };
});