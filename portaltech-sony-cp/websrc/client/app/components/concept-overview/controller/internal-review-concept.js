/*
    this controller is used on overview page -> internal review (tap)
*/

conceptProposal.controller('internalReviewConceptController',
    function internalReviewConceptController(        
        conceptWidgetServiceCore,
        conceptCommonServiceAPI,
        conceptCommonServiceField,
        $timeout,
        conceptCommonServiceManager,
        AppConfig,
        messageBundleServiceCore,
        conceptOverviewModel,
        conceptProposalServiceConcept,
        conceptWidgetServiceInternalReviewObjects
    ) {
        var conceptObject = conceptCommonServiceManager.concept();
        var conceptId = conceptObject.id;   

        this.suspended = false;
        this.suspendedmessage = ' ';
        this.savedMessage = ' ';
        this.config = conceptWidgetServiceCore;
        this.saved = false;
        var feedbackObject = null;

        /*
        *   File attachment - Only 1 allowed here
        *   If there is no attachment then it will create the file object
        *   Otherwise, it will populate the existing one
        */ 
        this.config.fileAttachment({'reviewAttachments':'proposal.overview.attachments'});        
        if(conceptObject.proposal) {
            feedbackObject = conceptObject.proposal.feedbackWsDTO;
            if((feedbackObject) && (feedbackObject.feedbackDocument)) {
                conceptCommonServiceField.field("proposal.overview.attachments").value( [feedbackObject.feedbackDocument] );
            };
        };
        /// This is the function below creates the fields and pre-populate them if necessary
        this.fields = conceptWidgetServiceInternalReviewObjects.internalReviewFields(feedbackObject);        

        // Make  dynamics fields visibles
        var timer = $timeout(function() {
            conceptCommonServiceField.field("concept.overview.internalReview.Rating").visible(true);
            conceptCommonServiceField.field("concept.overview.internalReview.Comment").visible(true);
            conceptCommonServiceField.field("concept.overview.attachments").visible(true);
        });

        /// Save function
        this.save = function(valid) {
            var imageId = 0, jsonPost = {fields:[]};
            try
            {
                var attachedDocs = this.config.reviewAttachments.value();
                var comment = conceptCommonServiceField.field('concept.overview.internalReview.Comment').value();
                var ratings = conceptCommonServiceField.field('concept.overview.internalReview.Rating').value();

                if(comment &&  ratings) {
                    jsonPost.fields.push({
                      "fieldCode": "comment",
                      "value": comment
                    });

                    jsonPost.fields.push({
                              "fieldCode": "rating",
                              "value": ratings
                            });

                    if(attachedDocs.length>0) {
                       jsonPost.fields.push({
                              "fieldCode": "feedbackDocument.id",
                              "value": attachedDocs[0].id   /// As attachment is limited to 1 only
                            });
                    }

                    conceptCommonServiceAPI.savefeedback(conceptId, jsonPost)
                    .success(angular.bind(this,function(data) {
                        this.saved = true;
                        this.savedMessage = messageBundleServiceCore.message('concept', 'concept.overview.internalReview.conceptSaved');
                    }))
                    .error(angular.bind(this,function(data, status) {
                        this.savedMessage = messageBundleServiceCore.message('concept','concept.overview.internalReview.conceptNotSaved');
                    }));
                }
            } catch (e) { }
        };

        this.suspended = function(){
            return suspend = conceptObject.status === AppConfig.CONCEPT_STATUS.SUSPENDED ? true : false;
        }

        /// Suspend button action here
        this.suspend = function(concept) {
            var localStatus = AppConfig.CONCEPT_STATUS.SUSPENDED;
            var postingResponse = [];
            postingResponse.push({
                      "fieldCode": "status",
                      "value": localStatus
                    });

            var suspendedObject1 = {"fields": postingResponse};
            // Submits suspend object to patch - Updates status of concept
            conceptCommonServiceAPI.updateinternalreview(conceptId, suspendedObject1)
            .success(angular.bind(this,function(data) {
                 /// Change back the status of withdraw concept back if it is changed
                 this.status = localStatus;
                 this.suspendedmessage = messageBundleServiceCore.message('concept','concept.overview.internalReview.conceptSuspended');
                 var promise = conceptCommonServiceManager.details(conceptId);
                 promise.then(angular.bind(this,function(data) {
                    conceptObject.status = localStatus; 

                    conceptCommonServiceField.field("concept.overview.internalReview.Rating").visible(true);
                    conceptCommonServiceField.field("concept.overview.internalReview.Comment").visible(true);
                    conceptCommonServiceField.field("concept.overview.attachments").visible(true);                    
                }));
            }))            
            .error(function(data, status) {
                  this.suspendedmessage = messageBundleServiceCore.message('concpet','concept.overview.internalReview.conceptNotSuspended');

            });
        };
    });
