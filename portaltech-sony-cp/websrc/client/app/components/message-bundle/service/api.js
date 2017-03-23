angular.module('messageBundle').service('messageBundleServiceAPI', function messageBundleServiceAPI(
    $http,
    $cacheFactory,
    sharedAPIConstantURL,
    oauth2FactoryHeaders
) {
    // Set up a base url for message bundle groups.
    var baseUrl = sharedAPIConstantURL + '/messagebundlegroups';

    // Cache
    var cache = $cacheFactory('messageBundleCache');

    // Options function to extend an object passed into an API call.
    function options(obj) {
        return angular.extend({
            cache: cache,
            headers: oauth2FactoryHeaders()
        }, obj || {});
    }

    // Get function runs a GET on the message bundle groups endpoint.
    this.get = function get(bundle) {
        return $http.get(baseUrl + '/' + bundle, options());
    };
});
