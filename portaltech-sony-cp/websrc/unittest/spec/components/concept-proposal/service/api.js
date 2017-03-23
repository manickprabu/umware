describe('conceptProposalServiceAPI', function conceptProposalServiceAPI() {
    var service;
    var $q;
    var $http;
    var conceptProposalFactoryAPICache;
    var oauth2FactoryHeaders;
    var sharedAPIConstantURL;

    function isAFunctionWhichReturnsAPromise(name, fnc) {
        describe('#' + name, function nameDescribe() {
            it('is a function.', function isFunction() {
                expect(typeof service[name]).toBe('function');
            });
            it('returns a promise.', function returns() {
                expect(service[name]().constructor).toBe($q.defer().promise.constructor);
            });
            fnc();
        });
    }

    beforeEach(function beforeEach() {
        module('conceptProposal');
        inject(function inject($injector) {
            service = $injector.get('conceptProposalServiceAPI');
            $q = $injector.get('$q');
            conceptProposalFactoryAPICache = $injector.get('conceptProposalFactoryAPICache');
            oauth2FactoryHeaders = $injector.get('oauth2FactoryHeaders');
            $http = $injector.get('$http');
            sharedAPIConstantURL = $injector.get('sharedAPIConstantURL');
        });
    });

    // A set of simple API call functions with similar patterns.
    [
        ['validate', 'post', { args: [{}], calledWith: {} }],
        ['init', 'put', { calledWith: {} }],
        ['save', 'put', { args: [{}], calledWith: {} }],
        ['config', 'get', { url: 'configuration', cache: true }]
    ].forEach(function simpleAPICalls(data) {
        var functionName = data[0];
        var methodName = data[1];
        var obj = data[2] || {};
        var url = obj.url || functionName;
        isAFunctionWhichReturnsAPromise(functionName, function apiFunction() {
            it([
                'uses $http to make a ' + methodName + ' call to /concepts/' + url + '.'
            ].join(''), function makesACall() {
                var fullUrl = [
                    sharedAPIConstantURL + '/concepts/' + url
                ].join('');
                var options = {
                    headers: oauth2FactoryHeaders()
                };
                if (obj.cache) {
                    options.cache = conceptProposalFactoryAPICache;
                }
                spyOn($http, methodName);
                service[functionName].apply({}, obj.args || []);
                if (methodName === 'get') {
                    expect($http[methodName]).toHaveBeenCalledWith(fullUrl, options);
                } else {
                    expect($http[methodName]).toHaveBeenCalledWith(
                        fullUrl,
                        obj.calledWith,
                        options
                    );
                }
            });
        });
    });
});
