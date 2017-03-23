
angular.module('conceptListing').controller('conceptFilterPopupController',
    function($scope, messageBundleServiceCore, conceptCommonServiceField, User){

        var filterObject = {};
        var filters = {};
        var selectedFilters = [];
        this.entity = $scope.$parent.$parent.entity;      

        this.filterLabel = function(key) {  
            // Formats key for message bundle using solr key
            var formattedKey = "concept.listing.filter." + key + '.label';           
            // Retrieves and returns label for key
            var label = this.message(formattedKey);
            return label;
        };       

        this.clearFilterPopover = function() {           
            $scope.$parent.$parent.filterPopoverOpen = false;
            filters = {};
        };

        this.removeFilters = function() {
            // Loop through filter and set each to selected false
            $scope.entity.filterFields.forEach(function(item) {
                item.values.forEach(function(value){
                    value.selected = false;
                });
            });
            // Clear filter count
            $scope.resetFilterCount();
            // Apply empty filter to reset result set
            this.applyFilter();
            // Close the filter popover
            this.clearFilterPopover();
        };       

        this.applyFilter = function() {
            var fields = this.entity.filterFields;

            fields.forEach( function(field) {
                (field.values || []).forEach( function(item) {
                    if(item.selected) {
                        filters[field.field] = (filters[field.field]) ? filters[field.field] + ',' + item.value : item.value;
                    }
                });
            });

            this.updateFilterControls(filters);
            this.clearFilterPopover();
        };

        this.updateFilterControls = function(filters) {
            this.entity.options.filters = filters;
            $scope.$parent.$parent.updateFilter();
        }

        this.selectFilter = function(item) {
            item.selected = !item.selected
            if(item.selected) {
                this.entity.filterCount ++;
            } else {
                this.entity.filterCount --;
            }
        }

        this.message = function message(key, placeholder) {
            return messageBundleServiceCore.message("concept", key, placeholder);
        };
    }
);