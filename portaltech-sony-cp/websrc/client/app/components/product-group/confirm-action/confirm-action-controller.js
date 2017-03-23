angular.module('wp3-product-group')
    .controller('ConfirmActionController', function ConfirmActionController($uibModal, $scope, $state) {

        this.close = function() {
            this.modal.close();
        };

        this.open = function() {
            this.modal = $uibModal.open({
                templateUrl: 'app/components/product-group/confirm-action/confirm-action-modal.html',
                scope: $scope,
                size: 'sm'
            });
        };

        this.confirm = function() {
            $state.go('index.productgroup.type');
        };
    })
