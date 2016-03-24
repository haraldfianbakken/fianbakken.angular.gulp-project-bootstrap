describe('Example', function () {
    'use strict';
    var scope, element;
    beforeEach(setupAppModule);
    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));


    describe('Scenario', function() {
        it('should be true', function () {
          expect(true).to.be.true;
        });

    });
});
