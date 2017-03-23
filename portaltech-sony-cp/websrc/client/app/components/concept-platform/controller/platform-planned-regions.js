
conceptProposal.controller('plannedRegionsController', 
    function($scope, releaseDate, conceptOverviewModel, conceptWidgetServicePlannedRegions, AppConfig){

        conceptWidgetServicePlannedRegions.init($scope.platformName);
        this.fields = conceptOverviewModel.fields($scope.platformName);

        this.plannedRegions = conceptWidgetServicePlannedRegions.getPlannedRegions(this.fields.plannedRegions);

        this.setReleaseDate = function(releaseDate) {
            // clear formatted Date
            delete this.selectedPlannedRegion.formattedDate;

            // set UI value
            this.selectedPlannedRegion.value = releaseDate;

            // Check for Quarter Date
            if(releaseDate.indexOf('Q') === -1) {
                // Format date to Date object
                var date = new Date(releaseDate);
                var formattedDate = AppConfig.formatToShortDate(date);              
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
                plannedRegion.releaseDate =  regionReleaseDate;
            }

            this.updateField();
        };

        this.updateField = function() {
            conceptWidgetServicePlannedRegions.updateField(this.fields.plannedRegions);
        }
        
    }
);
