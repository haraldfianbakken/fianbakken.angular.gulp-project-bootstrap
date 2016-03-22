(function (angular) {
    'use strict';
    angular.module('com.fianbakken.angular.bootstrap.web')
        .config(function($stateProvider) {

            $stateProvider.state('app.error', {
                url: '/error',
                templateUrl: 'src/error.html',
                controller: function($scope, $stateParams){
                    $scope.errorData = $stateParams.errorData;
                },
                params: { errorData: null }
            });



            // Abstract top-state for the app
            $stateProvider.state('app', {
                abstract: true,
                views: {
                    '@' : {
                        template: '<ui-view></ui-view>'
                    },
                    'header@' : {
                        templateUrl: 'src/unauthenticated-banner.html',
                    }
                }
            }).state('app.auth',{
                abstract: true,
                views: {
                    '@' : {
                        template: '<ui-view></ui-view>',
                    },
                    'header@' : {
                        templateUrl: 'src/authenticated-banner.html',
                        /*jshint ignore:start*/
                        controller: function($scope){
                            // Todo - initialize your authenticated session info and set this on scope.
                        }
                        /*jshint ignore:end*/
                    },
                },
                resolve : {
                    // Data to resolve on this method.
                }

            });
            $stateProvider.state('app.login', {
                url: '/login',
                templateUrl: 'src/areas/login/login.html',
                controller: function () {

                }
            });

            $stateProvider.state('app.logout', {
                url: '/logout',
                controller: function () {

                }
            });

            // Aadd extra states here - app.auth or
        })
        .run(function ($rootScope, $state, $log) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
                $log.debug('[NAV] Starting navigation to', toState.name, fromState.name);
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                $log.debug('[NAV] Navigated to', toState.name, toState);
            });

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                event.preventDefault();
                return $state.go('app.error', { errorData: error },{location: false, inherit: false});
            });
        });
})(angular);