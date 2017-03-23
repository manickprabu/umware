'use strict';

// Application-wide configuration. Not a shared component
angular.module('application').config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
