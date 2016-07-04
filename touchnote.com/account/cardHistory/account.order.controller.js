(function() {
    'use strict';

    angular.module('touchNote.account')
        .controller('DraftController', DraftController);

    DraftController.$inject = [ '$scope'];

    function DraftController($scope) {
        var vm = this;

        $scope.showBack = {};
        $scope.selected = {persionID:0};
        $scope.selectedProduct = $scope.draft.template;

        $scope.$watchCollection('selected', function(selected){
            if( selected ) {
                $scope.selectedProduct = $scope.draft.getProductByPersonID( selected.persionID ) || $scope.draft.template;
            }
        });

        $scope.flipCard = function() {
            $scope.showBack[ $scope.$index ] =! $scope.showBack[ $scope.$index ];
        }

        $scope.getMessage12 = function(msg) {
            return msg.message1 + ' ' + msg.message2;
        };

        return this;
    }


    angular.module('touchNote.account')
        .controller('OrderController', OrderController);

    OrderController.$inject = [ '$scope'];

    function OrderController($scope) {
        var vm = this;

        $scope.showOrderBack = {};
        $scope.selected = {persionID:0};
        $scope.selectedProduct = $scope.order.template;

        $scope.$watchCollection('selected', function(selected){
            if( selected ) {
                $scope.selectedProduct = $scope.order.getProductByPersonID( selected.persionID ) || $scope.order.template;
            }
        });

        $scope.flipCard = function() {
            $scope.showOrderBack[ $scope.$index ] =! $scope.showOrderBack[ $scope.$index ];
            $scope.selectedProduct.editMessage = null;
        }
        
        $scope.doFlipCard = function() {
            if(!$scope.selectedProduct.editMessage) {
                $scope.flipCard();
            }
        }

        $scope.customCardBackground = function() {
            //only these country has custom card layout (look :../images/postcard/)
            var customCountryList = [1, 5, 37, 51], className = '';

            //NO TEMPLATE NOW
            // if($scope.selectedProduct.template_uuid) {
            //     if(customCountryList.indexOf( Number($scope.selectedProduct.address.countryID)) != -1)
            //         className = 'postcard_' + $scope.selectedProduct.address.countryID;
            //     else 
            //         className = 'postcard'; // rest of the world 
            // }

            if(customCountryList.indexOf( Number($scope.selectedProduct.address.countryID)) != -1) {
                className += ' customStamp_' + $scope.selectedProduct.address.countryID;
            }

            return className;
        };

        return this;
    }

})();