/*
    this controllser is for overview page-> options(quick menu)
    this also holds all options level functionality.
*/
conceptProposal.controller('overviewOptionController',
    function overviewOptionController(        
        conceptCommonServiceAPI,
        conceptCommonServiceManager,
        $filter,
        $stateParams,
        $uibModal, AppConfig,User
    ) {          

        var conceptObject = conceptCommonServiceManager.concept();
        var conceptId = conceptObject.id;

        // Withdraw text on load
        this.withdrawText = conceptObject.status == AppConfig.CONCEPT_STATUS.WITHDRAWN ? $filter('messageBundle')('concept.options.undoWithdrawConcept') : $filter('messageBundle')('concept.options.withdrawConcept');
        
        // Checks if current user is an Account Manager
        this.isAccountManager = function(){
            return User.isAccountManager();
        };

        // Checks if current user is a Partner
        this.isPartner = function(){
            return User.isPartner();
        };

        this.accountManagerDetails = function() {
            var modalInstance = $uibModal.open({
                id: 'modalAccountManager',
                animation: true,
                templateUrl: 'app/components/concept-proposal/partial/account-manager-details.html',
                controller: 'conceptProposalControllerAccountManagerDetails',
                controllerAs: 'conceptProposalControllerAccountManagerDetails',
                windowClass: "center-modal",
                resolve: {
                    concept: function(){
                        return conceptObject
                    }
                }
              });
        };

        // Checks for an account manaager at the concept level
        this.hasAccountManager = function() {
            return conceptObject.hasOwnProperty('accountManager');
        }
        
        /// Funtion for withdraw button click
        this.withdraw = function(event) {
            event.stopPropagation();
            event.preventDefault();

            var submit = angular.bind(this, function submit(response) {
                var modalIsClosed = false

                // If concept status is WITHDRAWN allow user to UNWITHDRAW concept
                if(conceptObject.status == AppConfig.CONCEPT_STATUS.WITHDRAWN) {
                    postingResponse = {'fields':[
                        {
                          "fieldCode": "status",
                          "value": "UNDO"
                        },
                    ]};
                } else {
                    // Cancel modal - Do not update concept
                    if(typeof response == 'undefined'){
                        modalIsClosed = true
                    } else {
                        postingResponse = {'fields':[
                            {
                              "fieldCode": "status",
                              "value": AppConfig.CONCEPT_STATUS.WITHDRAWN
                            },
                            {
                              "fieldCode": "conceptStatusReason",
                              "value": response
                            }
                        ]};
                    };
                };           

            if(!modalIsClosed) {
            conceptCommonServiceAPI.updateinternalreview(conceptId, postingResponse)
                .success(angular.bind(this,function updateinternalreview(data) {

                     var promise = conceptCommonServiceManager.details(conceptId);                     
                     promise.then(angular.bind(this,function(dtoData) {
                         // Update the status of the current conceptObject
                         conceptObject.status = dtoData.data.status;
                         if(conceptObject.status == AppConfig.CONCEPT_STATUS.WITHDRAWN){
                             this.withdrawText = $filter('messageBundle')('concept.options.undoWithdrawConcept');
                         } else {
                             this.withdrawText = $filter('messageBundle')('concept.options.withdrawConcept');
                         }
                    }));

                }));
                }
            });

            // Withdraw Reason modal is not required to launch when unwithdrawing concept
            if(conceptObject.status !== AppConfig.CONCEPT_STATUS.WITHDRAWN) {
                var modalInstance = $uibModal.open({
                    id: 'editConcept',
                    animation: true,
                    templateUrl: 'app/components/concept-proposal/partial/confirm-concept-model.html',
                    controller: 'confirmConceptModelController',
                    controllerAs: 'confirmConceptModelController',
                    size: 'lg'
                }).result.then(submit);
            } else {
                submit();
            }
        };

        /*
        *   This is the validation check which validates,
        *   if user is : Account Manager OR Partner
        *   Then show the WITHDRAW concept link
        *   AND
        *   Don't show, if concept status is Active for partners only.
        */
        this.validationChecks = function() {
            var isLinkVisible = false;
            if(this.isPartner()) {               
                isLinkVisible = true;                
                if(conceptObject.status==='ACTIVE') {
                    isLinkVisible = false;                    
                }; 
            };

            if(this.isAccountManager()) {
                isLinkVisible = true;                                               
            };
            return isLinkVisible;
        };
    });
