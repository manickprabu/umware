'use strict';

conceptProposal.controller('confirmConceptModelController',
    function confirmConceptModelController(
        $uibModalInstance,
        conceptCommonServiceField,
        messageBundleServiceCore) {

        var vm = this;

        this.confirmModalOption = {
            body: messageBundleServiceCore.message('concept', 'editConcept.cancelComfirmation'),
            onConfirm: angular.bind(this, function(){
                return this.cancel();
            })
        }

        this.field = conceptCommonServiceField.field("concept.overview.cenceptWithdraw.Reason");
        this.field.visible(true);
        this.field.required(true);
        this.field.value('');


        this.message = function(key,placeholder) {
            return messageBundleServiceCore.message("concept", key, placeholder);
        }
        this.clickConfirm = function() {
            if(!this.field.empty()) {
                $uibModalInstance.close( this.field.value() );
            } else {
                // Triggers validation of input field
                this.field.getRequiredMessage(this.message("concept.overview.withdrawConcept.reason.required"));
            }
        };

        this.close = function() {
           // Reset error message and close dialog
           this.field.getRequiredMessage('');
           $uibModalInstance.close();
        };

        this.cancel = function() {
            // Reset error message
            this.field.getRequiredMessage('');
            $uibModalInstance.dismiss('cancel');
        };


    }
);
