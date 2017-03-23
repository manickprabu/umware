'use strict';

// Service for concept proposal
angular.module('conceptOverview').service('conceptOverviewModel', 
    function conceptOverviewModel(conceptCommonServicePageFields) {
        this.platformName;

        this.fields = function(platformName) {
            this.platformName = (platformName) ? platformName : this.platformName;
            return conceptCommonServicePageFields.getFieldList( platformName || this.platformName );
        }
    }
);
