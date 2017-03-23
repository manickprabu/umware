angular.module('oauth2').factory('oauth2FactoryHeaders', function (oauth2FactoryToken) {
    return function () {
        return {
            Authorization: oauth2FactoryToken,
            'Content-Type': 'application/json'
        };
    };
});
