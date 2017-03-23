angular.module('notification').service('notificationServiceAPI', function notificationServiceAPI(
    $http,
    sharedAPIConstantURL,
    oauth2FactoryHeaders
) {
    var baseUrl = sharedAPIConstantURL + '/notifications';
    function options(obj) {
        return angular.extend({
            headers: oauth2FactoryHeaders()
        }, obj || {});
    }

    this.list = function list() {
        return $http.get(baseUrl, options());
    };
    
    this.mark = function mark(id) {
        var idUrl = id === undefined ? '' : '/' + id;
        return $http.delete(baseUrl + idUrl, options());
    };
});
