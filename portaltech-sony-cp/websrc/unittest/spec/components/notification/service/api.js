describe('notificationServiceAPI', function notificationServiceAPI() {
    var service;
    var services = {};

    function isAFunctionWhichReturnsAPromise(name, fnc) {
        describe('#' + name, function nameDescribe() {
            it('is a function.', function isFunction() {
                expect(typeof service[name]).toBe('function');
            });
            it('returns a promise.', function returns() {
                expect(service[name]().constructor).toBe(services.$q.defer().promise.constructor);
            });
            fnc();
        });
    }

    beforeEach(function beforeEach() {
        module('notification');
        inject(function inject($injector) {
            service = $injector.get('notificationServiceAPI');
            [
                '$q',
                '$http',
                'sharedAPIConstantURL',
                'oauth2FactoryHeaders'
            ].forEach(function (name) {
                services[name] = $injector.get(name);
            });
        });
    });

    // A set of simple API call functions with similar patterns.
    [
        ['list', 'get'],
        ['mark', 'delete'],
        ['mark', 'delete', { args: [1] }]
    ].forEach(function simpleAPICalls(data) {
        var functionName = data[0];
        var methodName = data[1];
        var obj = data[2] || {};
        var url = '';
        if (obj.args) { url = '/' + obj.args; }
        isAFunctionWhichReturnsAPromise(functionName, function apiFunction() {
            it([
                'uses $http to make a ' + methodName + ' call to /notifications' + url + '.'
            ].join(''), function makesACall() {
                var fullUrl = services.sharedAPIConstantURL + '/notifications' + url;
                var options = {
                    headers: services.oauth2FactoryHeaders()
                };
                spyOn(services.$http, methodName);
                service[functionName].apply({}, obj.args || []);
                expect(services.$http[methodName]).toHaveBeenCalledWith(fullUrl, options);
            });
        });
    });
});
