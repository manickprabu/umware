
angular.module('wp3-product-group')
    .directive('productType', function sharedAccordion(){
        return {
            restrict:'A',
            scope: {
                product: '=productType'
            },
            bindToController: true,
            templateUrl: 'app/components/product-group/product-group-type/product-type-directive-partial.html',
            controller: 'ProductTypeDirectiveController',
            controllerAs: 'productTypeDirectiveController',
        };
    }
);
