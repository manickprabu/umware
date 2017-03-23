'use strict';

//Controller for Proposal Platform
angular.module('conceptListing').controller('conceptProposalControllerListing',
    function conceptProposalControllerListing($scope, User, AppConfig, conceptCommonServiceConfig, conceptListingReviewerService, conceptListingService)
    {
        //just warap all listing variables in one object
        var STATUS = AppConfig.CONCEPT_STATUS;
        var entity = $scope.entity = {
            conceptList:[],
            filterFields:[],
            user:null,
            filterOption:{},
            options:{},
            itemFound:'0 item found',
            user : User,
            filterCount : 0,
            loadTabCount : true //only for very first time
        };

        //default pagination options
        entity.paginationOptions = {
            limit           : 10,
            pageOffset      : 1,
            totalItems      : 0,
            paginationLimitOptions : [10, 20, 30, 40, 50]
        };

        
        entity.options = conceptListingService.queryObject();

        entity.tabs = conceptListingService.getTabs();
        entity.platforms = conceptCommonServiceConfig.config('platforms');
        entity.regions = conceptCommonServiceConfig.config('regions');

        $scope.resetFilterCount = function() {
            // Necessary since filter count is updated in popover controller
            $scope.entity.filterCount = 0;
        }

        //these templates we use to reviewer popup
        $scope.templates = {
            assignReview: 'app/components/concept-listing/partial/assign-reviewer-template.html',
            filterView  : 'app/components/concept-listing/partial/concept-filter-view.html'
        };

        //invoke api for every user changes
        $scope.updateFilter = function() {
            //update freeText
            entity.options.freeText = ($scope.searchField && $scope.searchField.length > 2) ? $scope.searchField : '';

            //limit & offset
            entity.options.limit = entity.paginationOptions.limit;
            entity.options.offset = entity.paginationOptions.pageOffset-1;

            conceptListingService.query( entity.options ).then(angular.bind(this, updateView));
        };

        entity.paginationOptions.onChangePage = $scope.updateFilter;

        //reset all filters
        function reset() {
            //defalt query options
            entity.options = conceptListingService.queryObject();
            $scope.searchField = '';
            $scope.resetFilterCount();
        }

        $scope.filterByTab = function(tab) {
            reset();

            entity.options.tabQuery = tab.query;
            entity.paginationOptions.pageOffset = 1;
            $scope.updateFilter();
        }

        $scope.updateFreeText = function() {
            entity.paginationOptions.pageOffset = 1;
            $scope.updateFilter();
        }

        $scope.orderBy = function(propertyName, order) {
            entity.options.orderBy = propertyName;
            entity.options.order = (order) ? 'desc' : 'asc';
            $scope.updateFilter();
        }


        //invoke very default filters
        //very first tab alwyas selected
        reset();
        $scope.filterByTab( conceptListingService.getTabById(STATUS.ALL) );

        function updateView(response) {
            var data = response.data;
            
            //reset reset & count
            entity.conceptList = [];
            entity.paginationOptions.totalItems = 0;

            if(data) {
                //process concepts
                if(data.concepts) {
                    entity.conceptList = data.concepts;
                } 

                //process query & count
                if(data.query) {
                    updateTabCount(data.query);
                    entity.paginationOptions.totalItems = data.query.count;
                    processQuery(data.query);
                }
            } 
        };

        //tab-count update's only very first time 
        function updateTabCount(query) {
            var tab;

            if(entity.loadTabCount) {
                //'ALL' tab
                tab = conceptListingService.getTabById(STATUS.ALL);
                tab.count = query.count;

                //update all other tab
                query.facets.forEach(function(facet) {
                    tab = conceptListingService.getTabById(facet.name);
                    tab.count = facet.count;
                });
            }

            entity.itemFound = query.count + ' items found';

            entity.loadTabCount = false;
        }

        //this method will have to refactor as soon API get changes.
        function processQuery(query) {
            //reset
            entity.filterFields = [];

            if(!query.fields) { 
                return 
            }
            
            query.fields.forEach(function(field) {
                // console.log('====', facet);
                switch(field.field) {
                    case 'feedbackRating':
                    case 'occCompliance':
                    case 'platforms':
                    case 'virtualCurrencyCompliance':
                    case 'regions':
                    case 'externalFeedbackRequired':
                    case 'status':
                    case 'type':
                        entity.filterFields.push(field);
                        break;
                }

            });
        }

        //reviewer
        conceptListingReviewerService.loadReviewerList().then(function() {
            $scope.reviewerList = conceptListingReviewerService.getReviewerList();
        })
        
        $scope.assignConceptToSelf = function(concept) {
            conceptListingReviewerService.assignConceptToSelf(concept);
        };

        $scope.assignReviewer = function(reviewer, concept) {
            conceptListingReviewerService.assignReviewer(reviewer, concept);
        };
    }
);
