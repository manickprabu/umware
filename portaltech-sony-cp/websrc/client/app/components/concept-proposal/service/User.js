'use strict';

//User object holds all user information.
angular.module('conceptProposal').service('User',
    ['conceptCommonServiceAPI',
    function conceptProposalUser( conceptCommonServiceAPI)
    {
        this.data = {id:0, name:'', groups:[]};
        this.reviewers ={};

        this.currentUser = function currentUser() {
            var promise = conceptCommonServiceAPI.currentUser();
            promise.then(angular.bind(this, function(response) {
                if(response.status == 200) {
                    this.data = response.data;
                }
            }));
            return promise;
        };

        this.loadReviewer = function loadReviewer() {
            var promise = conceptCommonServiceAPI.loadReviewer();
            promise.then(angular.bind(this, function(response) {
                if(response.status == 200) {
                    this.reviewers = response.data;
                }
            }));

            return promise;
        }

        //getters
        this.getReviewers = function() {
            return this.reviewers;
        };
        this.userId = function() {
            return this.data.id;
        }
        this.userName = function() {
            return this.data.name;
        }
        this.isReviewer = function() {
            return (this.data.groups.indexOf('reviewergroup') != -1);            
        }
        this.isAccountManager = function() {
            return (this.data.groups.indexOf('accountManagergroup') != -1);            
        }
        this.isPartner = function() {
            return (this.data.groups.indexOf('partnergroup') != -1);            
        }
        this.partnerId = function() {
            return this.data.partner.id;            
        }
        this.partnerName = function() {
            return this.data.partner.name
        }
    }
]);
