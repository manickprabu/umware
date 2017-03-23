'use strict';

angular.module('conceptProposal').controller('addFranchiseModalController',
    function addFranchiseModalController(
        $uibModalInstance,
        conceptWidgetServiceCore,
        conceptCommonServiceField,
        conceptProposalServiceConcept,
        conceptCommonServiceAPI,
        messageBundleServiceCore,
        conceptCommonServiceFranchise
        ) {

        var vm = this;

        this.buttonText = messageBundleServiceCore.message('concept', 'newFranchise.confirmButton');

        this.isSubmitting = false;

        this.franchiseName = '';

        this.errorMessages = [];

        this.title = messageBundleServiceCore.message('concept', 'newFranchise.title');

        this.introduction = messageBundleServiceCore.message('concept', 'newFranchise.introduction');

        this.placeholder = messageBundleServiceCore.message('concept', 'newFranchise.placeholder');

        this.label = messageBundleServiceCore.message('concept', 'newFranchise.label');

        this.cancelButton = messageBundleServiceCore.message('concept', 'newFranchise.cancelButton');

        this.clickConfirm = function() {

            this.buttonText = messageBundleServiceCore.message('concept', 'newFranchise.confirmButtonSubmitting');

            this.isSubmitting = true;

            //build request obj
            var franchise = {
                name: this.franchiseName
            };

            conceptCommonServiceAPI.createFranchise(franchise)
                .then(function(response) {
                    //succesfully added franchise
                    conceptCommonServiceFranchise.fetchFranchises()
                        .then(function(responseFranchises) {

                            //todo refector this code - it is repeated in the config service
                            var franchises = {};
                            if (conceptCommonServiceFranchise.franchises() !== null) {
                                conceptCommonServiceFranchise.franchises().forEach(function forEach(franchise) {
                                    franchises[franchise.id] = franchise.name;
                                });
                            };

                            conceptWidgetServiceCore.franchise.core.list(franchises);

                            //assign newly created franchise
                            conceptCommonServiceField.field('franchise').value(response.data.id);
                            conceptWidgetServiceCore.franchise.core.model(response.data.id);

                            //close dialog
                            $uibModalInstance.close();
                        });

                }, function(response) {
                    // error submitting franchise
                    vm.errorMessages = response.data.errors;

                    // reset dialog
                    vm.buttonText = messageBundleServiceCore.message('concept', 'newFranchise.confirmButton');
                    vm.isSubmitting = false;
                });

        };

        this.close = function() {
            //close dialog
            $uibModalInstance.close();
        };
    }
);
