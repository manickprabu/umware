
angular.module('wp3-product-group').controller('ProductTypeDirectiveController', 
    function(ProductGroupTypeService, messageBundleServiceCore, $state){

        //check if product exist
        if(!this.product) {
            throw new Error([
                'productType directive:',
                'Attribute value must be passed a array value.'
            ].join(' '));
        }

        //return icon if it has one
        this.getIcon = function() {
            return ProductGroupTypeService.getProductIcon(this.product);
        }

        //get popup message
        this.getMessage = function() {
            var content = messageBundleServiceCore.message('concept', 'productGroup.productType.'+this.product.code+'.information');
            return content;
        }

        //on click
        this.register = function() {
            if(this.product.enabled){
                $state.go('index.productgroup.register', {productType:this.product.code} );
            }
        }
    }
);