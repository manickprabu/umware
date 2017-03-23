'use strict';

angular.module('conceptProposal').controller('editConceptController',
    function editConceptController(
        $scope,
        $uibModalInstance,
        conceptWidgetServiceCore,
        conceptCommonServiceManager,
        messageBundleServiceCore
    ) {

        var vm = this;

        this.confirmModalOption = {
            body: messageBundleServiceCore.message('concept', 'editConcept.cancelComfirmation'),
            onConfirm: angular.bind(this, function(){
                return this.cancel();
            })
        }

        this.buttonText = messageBundleServiceCore.message('concept', 'editConcept.confirmButton');

        this.errorMessages = [];

        this.title = messageBundleServiceCore.message('concept', 'editConcept.title');

        this.introduction = messageBundleServiceCore.message('concept', 'editConcept.introduction');

        this.cancelButton = messageBundleServiceCore.message('concept', 'editConcept.cancelButton');

        this.concept = conceptWidgetServiceCore;

        // Fields categorised by type to loop through, reducing code repetition.
        this.fields = {
            // Consecutive name (text) fields.
            names: [
                'nameEN',
                'nameJA',
                'codeNameEn'
            ],

            // Dropdown field objects generated with associated dropdown configurations.
            dropdowns: [
                'superGenre',
                'categoryGenre'
            ].map(angular.bind(this, function (name) {
                var instance = this.config[name];
                return {
                    name: name,
                    instance: instance
                };
            })).concat([
                {
                    name: 'franchise',
                    instance: this.config.franchise.core
                }
            ])
        };
        this.config.superGenre.update()();

        //TO DO - to use default edit directive.
        this.clickConfirm = function() {

            this.buttonText = messageBundleServiceCore.message('concept', 'editConcept.confirmButtonSubmitting');

            conceptCommonServiceManager.save().then(function(response) {
                $uibModalInstance.close();
            });
        };

        this.close = function() {
           //close dialog
           $uibModalInstance.close();            
        };

        this.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };        

        this.saveFields = function saveFields(concept) {
            conceptCommonServiceManager.save();
        };

    }
);
