describe('notificationGlobal directive', function notificationGlobal() {
    // Somewhere to put all injected services.
    var services = {};

    // Load the module which contains the directive
    beforeEach(module('notification'));

    // Store references to services so they are
    // available to all tests in this describe block
    beforeEach(inject(function injector($injector) {
        [
            '$rootScope',
            '$compile'
        ].forEach(function inject(name) {
            services[name] = $injector.get(name);
        });
    }));

    xit('', function () {
        // Compiled piece of HTML containing the directive
        services.$compile('<div notification-global></div>')(services.$rootScope);
        // fire all the watches, so the scope expression express will be evaluated
        services.$rootScope.$digest();
    });
});
