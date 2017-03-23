/*
    this is main controller for overview page
*/

// Overview controller
conceptProposal.controller('conceptProposalControllerReview', ConceptProposalControllerReview);

function ConceptProposalControllerReview(
    conceptWidgetServiceCore,
    conceptCommonServiceAPI,
    conceptCommonServiceField,
    $scope,
    $state,
    $stateParams,
    User,
    $filter,
    AppConfig,
    conceptOverviewEditServiceModal,
    conceptCommonServiceManager,
    conceptOverviewValidationServices) {

        // Open edit modal.
        $scope.editConcept = conceptOverviewEditServiceModal.core;

        // Record function to output object on digest cycle.
        this.concept = conceptCommonServiceManager.concept();         

        // Route to product group
        this.createProductGroup = function() {
            $state.go('index.productgroup.type', {conceptId: $stateParams.conceptId});
        };
        this.conceptIsActive = angular.bind(this,function() {
            return this.conceptActive = this.concept.status === AppConfig.CONCEPT_STATUS.ACTIVE;
        });

        // Binding which return suspend update on digest cycle
        this.suspendText = function () {
            return suspend = this.concept.status === AppConfig.CONCEPT_STATUS.SUSPENDED ?  $filter('messageBundle')('concept.overview.unsuspendConcept.button') : $filter('messageBundle')('concept.overview.suspendConcept.button');
        }
        /// Dependencies
        this.config = conceptWidgetServiceCore;
        this.user = User;

        this.isAccountManager = function(){
            return User.isAccountManager();
        }
        this.isReviewer = function() {
            return User.isReviewer();
        }
        // Suspend a concept
        this.suspend = function() {
            var postingResponse = [];
            var localStatus = this.concept.status === AppConfig.CONCEPT_STATUS.SUSPENDED ? "UNDO" : AppConfig.CONCEPT_STATUS.SUSPENDED;
            postingResponse.push({
                      "fieldCode": "status",
                      "value": localStatus
                    });
            var suspendObj = {"fields": postingResponse};

            conceptCommonServiceAPI.updateinternalreview(this.concept.id, suspendObj)
            .success(angular.bind(this,function(data) {

                var promise = conceptCommonServiceManager.details(this.concept.id).then(angular.bind(this,function(response) {
                    if(response.data.status) {
                        this.concept.status = response.data.status;
                    } else {
                        this.concept.status = localStatus;
                    };

                    conceptCommonServiceField.field("concept.overview.internalReview.Rating").visible(true);
                    conceptCommonServiceField.field("concept.overview.internalReview.Comment").visible(true);
                    conceptCommonServiceField.field("concept.overview.attachments").visible(true);
                }));

            }));
        };

        /// Please read the information inside this service for this check
        this.partnersWithdrawnCheck = conceptOverviewValidationServices.partnersWithdrawnCheck();
};
