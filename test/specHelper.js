// Helper methods for spec suite

// Usage: beforeEach(setupAppModule);
var setupAppModule = function () {
    module('com.fianbakken.angular.bootstrap.web', function ($provide) {
        // Mock server config or constants in application for API-backend calls

        $provide.constant('serverConfig', { backendUri: 'http://api' });
        $provide.value('$window', {
            location: {
                replace: function (){},
                reload: function (){}
            }
        });
    });

    inject(function ($httpBackend, $rootScope) {
        $rootScope.$on('$stateChangeStart', function (event) {
            event.preventDefault();
        });
    });
};