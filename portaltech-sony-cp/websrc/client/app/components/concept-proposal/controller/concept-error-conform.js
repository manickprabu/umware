
angular.module('conceptProposal').controller('ConceptErrorConformController', 
    function ($uibModalInstance, message) {
    var $ctrl = this;

    this.message = message;

    $ctrl.confirm = function () {
        $uibModalInstance.close(true);
    };

    $ctrl.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
});