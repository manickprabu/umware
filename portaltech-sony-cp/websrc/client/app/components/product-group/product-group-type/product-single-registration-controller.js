'use strict';

angular.module('wp3-product-group').controller('SingleRegistrationController',
    function SingleRegistrationController($stateParams, ProductGroupTypeService) {

        var vm = this;

        this.productGroups = [];
        
        ProductGroupTypeService.loadProductType($stateParams.conceptId)
          .then(function(response) {
              vm.productGroups = ProductGroupTypeService.getProductType().groups;
          });
    }
);
