'use strict';

//User object holds all user information.
angular.module('wp3-product-group').service('ProductGroupTypeService',
    function ProductGroupTypeService($http, URLFactory )
    {   
        var productType = null;

        //these are available icon-mapper for productType
        var icons = {
            FULL_GAME           :'fa-gamepad',
            UPGRADABLE_FULL_GAME:'fa-cloud-download',
            DEMO                :'fa-eye',
            BETA                :'fa-puzzle-piece',
            DLC                 :'fa-download',
            SERVICE_ENTITLEMENT :'fa-lightbulb-o'
        }

        //return product icon
        this.getProductIcon = function(product) {
            if(product.icon && product.code) {
                return icons[product.code];
            }
            return '';
        }

        this.getProductType = function() {
            return productType;
        }

        //handler
        this.loadProductTypeHandler = function(response) {
            if (response.status == 200) {
                productType = response.data;
            }
        }

        //load productType
        this.loadProductType = function loadProductType(conceptId) {
            var promise = $http.get(URLFactory.productGroupTypes(conceptId), URLFactory.headers());

            promise.then(this.loadProductTypeHandler);
            return promise;
        };

    }
);
