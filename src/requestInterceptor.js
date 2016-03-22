angular.module('com.fianbakken.angular.bootstrap.web').factory('requestInterceptor', function ($q, $injector, $rootScope, $log) {
    'use strict';
    var navigateToStateName;
    var navigateToParams;

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        navigateToStateName = toState.name;
        navigateToParams = toParams;
    });

    return {
        'request': function(config) {
            return config;
        },
        'response': function(response) {
            if(response.status === 200 && response.headers('content-type') ==='application/json'){
                // Log all responses of type json response
                $log.debug(response.data);
            }
            return response;
        },
        responseError: function (response) {
            var $state = $injector.get('$state');
            //var stateHelper = $injector.get('stateHelper');
            $log.debug('Http-exception', response);

            // Unauthorized - Could add the to-state as well in params if we need a redirect
            if(response.status === 401){
                $state.go('app.login');
                return $q.reject(response);
            }


            if(response.status === 404 || response.status === 400){
                $log.debug('Invalid request or not-found (validation or rest-behavior) and let caller handle this');
                return $q.reject(response);
            }

            $state.go('app.error', { errorData: response },{location: false, inherit: false});
            return $q.reject(response);
        }

    };
});

angular.module('com.fianbakken.angular.bootstrap.web').config(function ($httpProvider) {
    'use strict';
    $httpProvider.interceptors.push('requestInterceptor');
});