describe('oauth2401Redirect', function () {
    var service;
    var $location;

    function exists(name) {
        it('is a function.', function isFunction() {
            expect(typeof service[name]).toBe('function');
        });
    }
    function isGetterSetter(name, values) {
        it('returns the value passed into it persistently.', function () {
            values.forEach(function (value) {
                expect(service[name](value)).toBe(value);
                expect(service[name]()).toBe(value);
            });
        });
    }

    beforeEach(function () {
        module('oauth2');
        inject(function ($injector) {
            service = $injector.get('oauth2401Redirect');
            $location = $injector.get('$location');
        });
    });

    describe('#url', function () {
        exists('url');
        isGetterSetter('url', [
            '/123',
            '/abc/',
            '/'
        ]);
    });
    describe('#go', function () {
        exists('go');
        it('redirects to the chosen url.', function () {
            service.url('/to');
            service.go();
            expect($location.path()).toBe('/to');
        });
    });
    describe('#back', function () {
        exists('back');
        it('redirects back to location when "go" was called.', function () {
            $location.path('/from');
            service.url('/to');
            service.go();
            service.back();
            expect($location.path()).toBe('/from');
        });
    });
});
