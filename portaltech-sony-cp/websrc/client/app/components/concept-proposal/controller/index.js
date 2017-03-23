'use strict';

angular.module('conceptProposal').controller('conceptProposalControllerIndex',
    function conceptProposalController(
        $scope,
        $state,
        $filter,
        $timeout,
        conceptCommonServiceField,
        globalFieldsService,
        conceptCommonServiceManager,
        conceptValidationService
    ) {
        $scope.draft = {
            'saved' : false,
            'content' : ' '
        };
        $scope.submit = {
            'submitted':false,
            'content' : ' '
        };

        // Todo: Proposal controller has a show function.
        // These can be removed as they are redundant.
        // Remove safely.
        this.show = {};
        this.show.conceptName = function showConceptName(value) {
            return conceptCommonServiceField.field('nameJA').visible(value);
        };
        this.show.codeName = function showCodeName(value) {
            return conceptCommonServiceField.field('codeNameEn').visible(value);
        };

        function savedMessage(messageBundle) {
            return $scope.draft.content = $filter('messageBundle')(messageBundle);
        }
        function submitMessage(messageBundle) {
            return $scope.submit.content = $filter('messageBundle')(messageBundle);
        }

        // Save the draft.
        this.save = function save() {
            // Run the save API.
            conceptCommonServiceManager.save().then(function(response) {
                // On completion, redirect from proposal.
                var chunks = $state.current.name.split('.');
                var currentState = chunks[chunks.length - 1];

                // Only redirect from proposal, not draft.
                if ($state.includes('index.concept.proposal')) {
                    $state.go('index.concept.draft.' + currentState, { conceptId:response.id });
                }

                // Set saved message for save button popup.
                savedMessage('proposal.draftSaved');
                // Set to true to open popover
                $scope.draft.saved = true;
                // Reset isOpen attribute to stop popover being opened on reload
                $scope.draft.saved = false;

            }).catch(function () {
                // On rejection, draft not saved message to be displayed.
                savedMessage('proposal.draftNotSaved');
                $scope.draft.saved = false;
            });
        };

        this.legalDisclaimerAccepted = conceptCommonServiceField.field('compliance.legalDisclaimerAccepted');

        //submit functions
        this.showSubmit = function showSubmit() {
            return $state.params.showSubmit;
        };

        this.toSubmit = function() {
            var valid = conceptValidationService.validateAllPage() || true;

            //we are sure that all required fields are ready to submit.
            if(valid) {
                var savePromise = conceptCommonServiceManager.submit();

                savePromise.then(function(response) {
                    //only on success
                    if(response.status === 200){
                        submitMessage('proposal.draftSubmitted');

                        /// Redirect to the overview state
                        $timeout(function() {
                            $state.go('index.concept.overview', {conceptId:response.data.objectData.id});
                        }, 1000);

                        /// Concept crated then create the notifications
                        globalFieldsService.setValue(true);

                    } else {
                        submitMessage('proposal.draftNotSubmitted');
                    }
                    $scope.submit.submitted = true;

                }, function (response) {
                    // Rejection when unsuccessful.
                    if (response !== undefined) {
                        conceptValidationService.notifiyErrorMsg(response.data);

                        // Content is a list of issues generated from the list of
                        // validation fields.
                        $scope.submit.content = response.data.validationFields.map(
                        function map(validationField) {
                            return $filter('messageBundle')(validationField.errorMessage);
                        }).join('<br/>');

                    } else {
                        // If no response is passed through, just show generic error message.
                        submitMessage('proposal.draftNotSubmitted');
                    }
                    $scope.submit.submitted = true;
                });
            }
        };

    }
);
