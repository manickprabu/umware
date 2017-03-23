angular.module('oauth2').factory('oauth2FactoryToken', function ($cookies) {
    return function () {
        return $cookies.token;
    };
});
