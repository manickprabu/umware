'use strict';

angular.module('conceptListing').service('conceptListingReviewerService', 
    function conceptListingReviewerService(conceptCommonServiceAPI, User, AppConfig) {

        var selfReviewer, reviewerList = [];

        //load reviewer list
        function loadReviewerList() {
            reviewerList = [];

            if( User.isReviewer() ) {
                return User.loadReviewer().then(function(response) {
                    reviewerList = User.getReviewers().users;

                    reviewerList.forEach(function(item) {
                        item.self = User.userId() == item.id;
                        if(item.self) {
                            selfReviewer = item;
                        }
                    });
                });
            };

            //empty promise
            return {then:angular.noop}

        }

        //return reviewer list
        function getReviewerList() {
            return reviewerList;
        }

        function assignConceptToSelf(concept) {
            assignReviewer(selfReviewer, concept);
        }

        //patch update selected concept to particular reviewer. 
        function assignReviewer(reviewer, concept) {
            var requestObj = { "fields": [ {
                                  "fieldCode": "reviewer.id",
                                  "value": reviewer.id
                                } ]
                            };

            concept['proposal'] = {reviewer: reviewer};
            conceptCommonServiceAPI.updateConcept(concept.id, requestObj);
        };


        return {
            loadReviewerList : loadReviewerList,
            assignReviewer : assignReviewer,
            assignConceptToSelf : assignConceptToSelf,
            getReviewerList : getReviewerList
        }

    }
);