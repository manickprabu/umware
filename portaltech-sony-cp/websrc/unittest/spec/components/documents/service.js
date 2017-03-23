describe('documentsService', function documentsService() {
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
        module('documents');
        inject(function inject($injector) {
            [
                '$q',
                'oauth2FactoryHeaders',
                '$http',
                'sharedAPIConstantURL',
                '$window'
            ].forEach(function (name) {
                services[name] = $injector.get(name);
            });
            service = $injector.get('documentsService');
        });
    });


    isAFunctionWhichReturnsAPromise('api', function apiFunction() {
        it([
            'uses $http to make a post call to /documents.'
        ].join(''), function makesACall() {
            var formData = new FormData();
            formData.append('file', 'file');
            formData.append('language', 'language');
            spyOn(services.$http, 'post');
            service.api('language', 'file');
            expect(services.$http.post).toHaveBeenCalledWith(
                services.sharedAPIConstantURL + '/documents',
                formData,
                {
                    transformRequest: services.$window.angular.identity,
                    headers: services.$window.angular.extend(
                        services.oauth2FactoryHeaders(),
                        { 'Content-Type': undefined }
                    )
                }
            );
        });
    });
});
