'use strict';

angular.module('wp3-product-group').config(function config($stateProvider) {

    $stateProvider
    // Product Group
    .state('index.productgroup', {
        url: '/productgroup/:conceptId',
        views: {
            '': {
                templateUrl: 'app/components/product-group/product-group.html'
            },
            'header@index.productgroup': {
                templateUrl: 'app/components/product-group/product-group-header/product-group-header.html',
            }
        },
        abstract: true,
        resolve: {
            //resolve all application level end-point to makesure avilable before applicaiton ready
            message: function message(messageBundleServiceCore) {
                return messageBundleServiceCore.resolve('concept');
            }
        }
    })

    .state('index.productgroup.type', {
        url: '/type',
        views: {
            '': {
                templateUrl: 'app/components/product-group/product-group-type/product-type-partial.html',
                controller: 'ProductTypeController',
                controllerAs: 'productTypeController',
                activetap: 'single-registration'
            },
            'single-registration@index.productgroup.type': {
                templateUrl: 'app/components/product-group/product-group-type/product-single-registration-partial.html',
                controller: 'SingleRegistrationController',
                controllerAs: 'singleRegistrationController'
            },
            'bulk-registration@index.productgroup.type': {
                templateUrl: 'app/components/product-group/product-group-type/product-bulk-registration-partial.html',
                controller: 'BulkRegistrationController',
                controllerAs: 'bulkRegistrationController'
            }
        }
    })

    .state('index.productgroup.register', {
        url: '/register/:productType',
        views: {
            '' : {
                templateUrl: 'app/components/product-group/product-group-register/product-group-register.html'
            },
            'header@index.productgroup' : {
                templateUrl: 'app/components/product-group/product-group-register/product-group-register-header.html',
            }
        },
        resolve: {
            //resolve all application level end-point to makesure avilable before applicaiton ready
            message: function message(messageBundleServiceCore) {
                return messageBundleServiceCore.resolve('concept');
            }
    }
})
});
