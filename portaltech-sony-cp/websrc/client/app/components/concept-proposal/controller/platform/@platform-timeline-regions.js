
conceptProposal.controller('plannedRegionsControllerDELETED',
    function($scope, sharedMultiSelectFactory, conceptCommonServiceConfig, 
        releaseDate, conceptProposalPlatformDataModel, $filter){

        this.fields = conceptProposalPlatformDataModel.getFieldList($scope.platformName);

        this.field = conceptCommonServiceField.field(this.fields.plannedRegions);
        this.plannedRegions = conceptCommonServiceConfig.config('regions').map(function (region) {
                return {code: region.code, name : region.name};
            })

        this.updatePlannedRegions = function(target) {
            var releaseDates = [];

            this.plannedRegions.forEach(function(region) {               

                // If formatted date is a Date object
                if(region.formattedDate) {
                    var item = {
                        "releaseDate":{
                            "date": $filter('date')(region.formattedDate, 'yyyy-MM-ddTHH:mm:ss') + 'Z',
                        },
                        "region":{
                             code:region.code
                        }
                    };
                    // Push object to array to set field value
                    releaseDates.push( item );

                }else if(region.releaseDate) {
                    // Quarter date required object properties
                    var item = {
                        "releaseDate": region.releaseDate, //$filter('date')(, 'yyyy-MM-ddTHH:mm:ss') + 'Z',
                        "region":{
                             code:region.code
                        }
                    };

                    releaseDates.push( item );
                }

            });
            // Set the filed value after iteration
            this.field.value(releaseDates);
        }


        this.setReleaseDate = function(releaseDate) {
            // clear formatted Date
            delete this.selectedPlannedRegion.formattedDate;

            // set UI value
            this.selectedPlannedRegion.value = releaseDate;

            // Check for Quarter Date
            if(releaseDate.indexOf('Q') === -1) {
                // Format date to Date object
                var date = new Date(releaseDate);
                var formattedDate = $filter('date')(date, 'yyyy-MM-dd');              
                this.selectedPlannedRegion.formattedDate = formattedDate;
                this.selectedPlannedRegion.value = formattedDate;
            } 
            
            // trigger change event
            this.releaseDateChanged(this.selectedPlannedRegion);
            // close pop-up
            this.selectedPlannedRegion.isPopupOpen = false;
        }

        this.onRegionFocus = function(plannedRegion) {
            this.selectedPlannedRegion = plannedRegion;
        };

        this.releaseDateChanged = function(plannedRegion) {

            // remove existing release date
            delete plannedRegion.releaseDate;
            // parse release date
            var regionReleaseDate = releaseDate.getReleaseDate(plannedRegion.value);

            // if could parse release date
            if(regionReleaseDate !== null) {                
                plannedRegion.releaseDate =  regionReleaseDate; //$filter('date')(regionReleaseDate, 'yyyy-MM-ddTHH:mm:ss') + 'Z' ;
            }

            this.updatePlannedRegions();
        };


        //pre set selected value
        if(this.field.value()) {
            this.field.value().forEach(angular.bind(this, function(value) {

                this.plannedRegions.forEach(angular.bind(this, function(region) {
                    var releaseDate = value.releaseDate.date || value.releaseDate.quarterTime.quarter + '-' + value.releaseDate.quarterTime.year
                    if(region.code == value.region.code && releaseDate) {
                        this.selectedPlannedRegion = region;
                        this.setReleaseDate( releaseDate );
                    }
                }));

            }));
        }
    }
);
