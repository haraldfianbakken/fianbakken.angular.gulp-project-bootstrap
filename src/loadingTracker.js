angular.module('com.fianbakken.angular.bootstrap.web').factory('loadingTracker', function (promiseTracker) {
  'use strict';
  return promiseTracker('loadingTracker', {
    activationDelay: 0,
    minDuration: 5000
  });
});