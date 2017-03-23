describe('oauth2Initialisation', function () {
    var service;

    beforeEach(function () {
        module('oauth2');
        inject(function ($injector) {
            service = $injector.get('oauth2Initialisation');
        });
    });

});
