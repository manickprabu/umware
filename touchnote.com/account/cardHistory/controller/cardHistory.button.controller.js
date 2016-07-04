(function() {
    'use strict'

    var module = angular.module('touchNote.account');
    
    //Copy Card Button
    module.controller('EditPCMessageCtrl', ['$scope', function($scope) {
        $scope.remainingLine = 0;
        $scope.onEditing = true;

        $scope.show = function() {
            return $scope.showOrderBack[$scope.$index] 
                   && $scope.selectedProduct.editMessage != null
                   && $scope.order.template.cardType == 'postcard';
        }

        $scope.close = function() {
            $scope.selectedProduct.editMessage = null;
            $scope.label = 'Edit message';
        }
    }]);


    module.controller('EditGCMessageCtrl', ['$scope', function($scope) {
        $scope.remainingLine = 0;
        $scope.onEditing = true;

        $scope.show = function() {
            return  $scope.showOrderBack[$scope.$index] 
                    && $scope.selectedProduct.editMessage != null
                    && $scope.order.template.cardType == 'postcard';
        }

        $scope.close = function() {
            $scope.selectedProduct.editMessage = null;
            $scope.label = 'Edit message';
        }
    }]);


    //Copy Card Button
    module.controller('EditCardBtnCtrl', ['$scope', function($scope) {
        $scope.label = 'Edit card';

        $scope.show = function() {
            return !$scope.showOrderBack[$scope.$index] && $scope.order.canCancelOrder();
        }
    }]);


    //Copy Card Button
    module.controller('ShowAddressBtnCtrl', ['$scope', function($scope) {
        $scope.show = function() {
            $scope.label = ( !$scope.showAddress[$scope.$index + 1000] ) ? 'Show address' : 'Show front';
            return $scope.order.template.cardType == 'greetingCard' && !$scope.showOrderBack[$scope.$index];
        }
    }]);

    //Copy Card Button
    module.controller('CopyCardBtnCtrl', ['$scope', function($scope) {
        $scope.show = function() {
            return !$scope.showOrderBack[$scope.$index];
        }
    }]);


    //Cancel Card Button
    module.controller('CancelCardBtnCtrl', ['$scope', function($scope) {
        $scope.show =  function () {
            $scope.label = getLabel();

            return ($scope.showOrderBack[$scope.$index] || $scope.showAddress[$scope.$index + 1000]) 
                    ? $scope.selectedProduct.canCancelCard() : $scope.order.canCancelOrder();
        }

        function getLabel() {
            if($scope.order.cancelInProgress) return 'Cancelling...';
            if($scope.showOrderBack[$scope.$index] || $scope.showAddress[$scope.$index + 1000]) return 'Cancel card';
            return 'Cancel order';
        }
    }]);


    //edit message for selected order->card
    module.controller('EditMessageBtnCtrl', ['$scope', '$state', 'dataStore', 'orderService', 'touchNoteCard',
        function($scope, $state, dataStore, orderService, touchNoteCard) {
            
            $scope.label = 'Edit message';
            var cardIdList = [], product = {}, message;
            product.statusCode = -1;

            $scope.action = function() {
                    
                product = $scope.selectedProduct;
                message = (product.productType == 'PC') ? product.message : product.messages;

                //update message
                if(product.editMessage || product.editMessage == '') {
                    $scope.label = '<i class="fa fa-refresh fa-spin fa-spin-pos"></i> Updating ...';
                    product.statusCode = 0;

                    product.message = product.editMessage;

                    //update original order if its already saved..
                    if(product.productType == 'PC') {
                        var savedOrder = touchNoteCard.getSavedOrder($scope.order, true);

                        if(savedOrder && savedOrder.template) {
                            savedOrder.template.messages.primary = product.message;
                            touchNoteCard.backupOrder(savedOrder);
                        }
                    }

                    //update message
                    var service = (product.productType == 'PC') ? orderService.editPostcardCardMessage : orderService.editGreetingCardMessage;
                    service(cardIdList, touchNoteCard.renderMessage(product) ).then(function(response) {
                        if(response.status == 'success') {
                            $scope.label = 'Edit message';
                            product.statusCode = 1;
                            $scope.loadHistory();
                            product.editMessage = null;
                        } else {
                            product.statusCode = 2;
                        }
                    });

                    return;
                }

                if(product.productType == 'GC' && !message.changed){
                    message.message2 = product.message.custom_1;
                    message.message3 = product.message.custom_2;
                    message.message4 = product.message.custom_3;
                    message.changed = true;

                    cardIdList = [ String(product.realCardID) ]

                } else if(product.productType == 'PC') {
                    message = product.message || ' ';

                    for(var _product in $scope.order.products) {
                        _product = $scope.order.products[_product];
                        cardIdList.push( String(_product.realCardID) );    
                    }
                }

                $scope.selectedProduct.editMessage = message;
                $scope.label = 'Save message';

            };  

            $scope.$watch('selectedProduct.editMessage', function() {
                if($scope.selectedProduct.editMessage == null)
                    $scope.label = 'Edit message';
            })

            $scope.show  = function() {
                return ($scope.showOrderBack[$scope.$index] && $scope.selectedProduct.canCancelCard() );
            } 
    
        }
    ]);



    //edit address for selected order->card
    module.controller('EditAddressBtnCtrl', ['$scope', '$state', 'dataStore', 'orderService',
        function($scope, $state, dataStore, orderService) {

        $scope.label = 'Edit address';

        $scope.action = function() {

            var product = $scope.selectedProduct;
            var contact = product.recipients[Object.keys(product.recipients)[0]];

            dataStore.unbindAll('editAddress');
            dataStore.set('addBillingAddress', true);
            dataStore.set('editAddress', { address: contact.address(), recipientName: contact.name(), contact: contact, isOrderHistory:true });
            dataStore.bind('editAddress', function() {
                
                $scope.label = '<i class="fa fa-refresh fa-spin fa-spin-pos"></i> Updating ...';
                var formAddress = dataStore.get('editAddress');
                var address = formAddress.address;
                var contact = formAddress.contact;
                contact.firstName = formAddress.recipientName;

                //update hardHistory
                product.recipients[contact.personID] = contact;

                var renderedAddress = address.renderForServer();
                renderedAddress.first_name = contact.name();

                orderService.editCardAddress(product.realCardID, renderedAddress).then(function(response) {
                    $scope.label = 'Edit address';
                    $scope.loadHistory();
                });
            });

            $state.go('top.contacts.addForm');
        };

        $scope.show  = function() {
            return ($scope.showOrderBack[$scope.$index] && $scope.selectedProduct.canCancelCard() ) ;
        }
            
    }]);

})();