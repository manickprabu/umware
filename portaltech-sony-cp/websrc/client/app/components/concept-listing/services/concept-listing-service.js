'use strict';

angular.module('conceptListing').service('conceptListingService', 
    function conceptListingService(conceptCommonServiceAPI, User, AppConfig) {
        
        var tabs, STATUS = AppConfig.CONCEPT_STATUS;

        function getTabs() {
            //tabes list only if user is partner 
            //every "query" will pull its own default concepts. 
            var partnerTabs = [
                { id:STATUS.ALL, count:0, title:'All', query:{facetName : STATUS.ALL} },
                { id:STATUS.ASSIGNED_TO_ME, count:0, title:'My Concepts', query:{facetName : STATUS.ASSIGNED_TO_ME} },
                { id:STATUS.DRAFT, count:0, title:'My Drafts', query:{facetName : STATUS.DRAFT} },
                { id:STATUS.WITHDRAWN, count:0, title:'Withdrawn', query:{facetName : STATUS.WITHDRAWN} },
                { id:STATUS.INACTIVE, count:0, title:'Inactive', query:{facetName : STATUS.INACTIVE} }
            ];
            
            //tabs list only if user is review
            var reviewerTabs = [
                { id:STATUS.ALL, count:0, title:'All', query:{facetName : STATUS.ALL} },
                { id:STATUS.ASSIGNED_TO_ME, count:0, title:'Assigned to me', query:{facetName : STATUS.ASSIGNED_TO_ME} },
                { id:STATUS.UNASSIGNED, count:0, title:'Unassigned', query:{facetName : STATUS.UNASSIGNED} },
                { id:STATUS.NEW, count:0, title:'New', query:{facetName : STATUS.NEW}},
                { id:STATUS.SUSPENDED, count:0, title:'Suspended', query:{facetName : STATUS.SUSPENDED} },
            ];

            //return tab-list based on user-role
            tabs = (User.isReviewer() || User.isAccountManager()) ? reviewerTabs : partnerTabs;
            return tabs;
        }

        function getTabById(id) {
            var currentTab;
            tabs.forEach(function(tab) {
                if(tab.id == id) {
                    currentTab = tab;
                }
            });
            return currentTab;
        };

        //build query string based on options object
        function queryString(options) {
            var query = {};

            if(options.freeText && options.freeText.length > 2) {
                query.freeText = options.freeText;
            }

            angular.extend(query, options.tabQuery);

            //parse filter query string;
            angular.forEach(options.filters, function(value, key) {
                query[key] = value;
            });

            query.limit = options.limit;
            query.offset = options.offset;

            query.orderBy = options.orderBy;
            query.order = options.order;

            return query;
        };

        //send query request on every changes from list-page 
        //i.e: change tab, add filters, pagination or search by freeText
        function query(options) {
            var query = queryString(options);
            // console.log('FINAL-QUERY:', query );
            return conceptCommonServiceAPI.list( query );
        };

        //default query object;
        function queryObject() {
            return {
                limit:0,
                offset:0,
                freeText : '',
                filters:{},
                tabQuery:{},
                orderBy:'id',
                order:'asc'
            }
        }

        return {
            query           : query,
            queryObject     : queryObject,
            getTabs         : getTabs,
            getTabById      : getTabById
        }
    }
);