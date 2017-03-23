// HTTP OAuth2 Interception for Login
angular.module('oauth2').service('oauth2Interceptor',
function oauth2Interceptor($q, oauth2401Redirect) {
    this.responseError = function responseError(response) {
        if (response.status === 401) {
            oauth2401Redirect.go();
        }

        return $q.reject(response);
    };
});
