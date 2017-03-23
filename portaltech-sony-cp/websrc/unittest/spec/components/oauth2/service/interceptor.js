describe('oauth2Interceptor', function () {
    var service;
    var $q;
    var oauth2401Redirect;

    beforeEach(function () {
        module('oauth2');
        inject(function ($injector) {
            service = $injector.get('oauth2Interceptor');
            $q = $injector.get('$q');
            oauth2401Redirect = $injector.get('oauth2401Redirect');
        });
    });

    describe('#responseError', function () {
        it('returns a promise.', function () {
            expect(service.responseError({}).constructor).toBe($q.when().constructor);
        });
        it('runs redirection when given a 401 status code.', function () {
            spyOn(oauth2401Redirect, 'go');
            service.responseError({ status: 401 });
            expect(oauth2401Redirect.go).toHaveBeenCalled();
        });
    });
});
