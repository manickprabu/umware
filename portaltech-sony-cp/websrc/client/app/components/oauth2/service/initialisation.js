// Initialisation OAuth service for general setup.
angular.module('oauth2').service('oauth2Initialisation',
function ($cookies, $http) {
    this.token = function setToken(token) {
        $http.defaults.headers.common['X-Access-Token'] = token || $cookies.token;
    }
});
