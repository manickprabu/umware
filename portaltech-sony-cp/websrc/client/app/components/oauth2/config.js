angular.module('oauth2').config(function ($httpProvider, OAuthProvider) {
    $httpProvider.interceptors.push('oauth2Interceptor');

    OAuthProvider.configure({
        grant_type:'password',
        //baseUrl is a constant defined in api/component
        //expect value to be updated
        baseUrl: '/',
        clientId: 'trusted_client',
        clientSecret: 'secret',
        grantPath: '/authorizationserver/oauth/token'
    });
});
