angular.module('wp3-product-group')
    .directive('cpConfirmActionModal', function() {
        return {
            restrict: 'A',
            controllerAs: 'confirmActionController',
            controller: 'ConfirmActionController',
            link: link
        };
    });

function link(scope, el, attr, ctrl) {
    el.bind('click', function() {
        ctrl.open();
    });
};
