
// Controller for Proposal Platform

angular.module('conceptProposal').directive('platformPlaystationEdit', platformPlaystationEdit);
function platformPlaystationEdit() {
    return {
        restrict: 'A',
        // transclude: true,
        templateUrl: 'app/components/concept-platform/partial/platform-playstation-edit.html',
        controller : 'conceptPlatformControllerCompetitorPlatform',
        controllerAs : 'competitorPlatformCtrl',
        bindToController: true,
        scope:{
            platformPlaystationEdit: '=',
        }
    };
};
angular.module('conceptProposal').controller('conceptPlatformControllerCompetitorPlatform',
    function conceptPlatformControllerCompetitorPlatform(
        releaseDate,
        conceptWidgetPlayStation,
        conceptCommonServiceField,
        conceptCommonServiceConfig,
        $filter
    ) {
        var vm = this;
        this.isSelectAllPlatforms = false;
        this.field = conceptCommonServiceField.field('proposal.plannedCompetitorPlatforms');
        this.competitorRegions = conceptCommonServiceConfig.config('competitorRegions');
        vm.availableCompetitorPlatform = conceptWidgetPlayStation.getMatrixData();

        this.toggleSelectAllPlatforms = function toggleSelectAllPlatforms() {
            // toggle isSelectAllPlatformsActive flag
            vm.isSelectAllPlatforms = !vm.isSelectAllPlatforms;

            vm.availableCompetitorPlatform.forEach(angular.bind(this, function(platform) {
                platform.selected = vm.isSelectAllPlatforms;


            }));
        };

        this.updatePlatform = function(platform) {

                // Set regions dates to null in order to reset the date field
                platform.regions.forEach(function(region) {
                    region.value = null;
                    region.releaseDate = null;
                });

                // replace available regions with updated null regions object to nullify dates
                vm.availableCompetitorPlatform.forEach(function(region){
                    if (region.id == platform.id) {
                        region.regions = platform.regions;
                    }
                })
                // Update field values
                conceptWidgetPlayStation.updateToField(vm.availableCompetitorPlatform);

        }
        this.releaseDateChanged = angular.bind(this, function(value) {

            conceptWidgetPlayStation.updateToField(vm.availableCompetitorPlatform);

        });

        this.setCompetitiorPlatformReleaseDate = function(releaseDate) {

            if (typeof this.selectedPlatform === 'undefined' ||
                typeof this.selectedRegion === 'undefined') {
                return; // found no selected platform/region - bail
            }

            // Clear formatted date
            delete this.selectedRegion.formattedDate;

            // Check for Quarter Date
            if(releaseDate.indexOf('Q') == -1){
                // Set releaseDate to be a Date object
                var date = new Date(releaseDate);

                var formattedDate = date.toISOString();
                formattedDate = conceptWidgetPlayStation.formatDate(formattedDate);
                this.selectedRegion.formattedDate = formattedDate;
            }

            this.selectedRegion.value = releaseDate;

            // trigger update for concept proposal object
            this.releaseDateChanged(this.selectedRegion);

            //this.isReleaseDatePopupOpen = false;
            this.selectedRegion.isPopupOpen = false;
        }

        this.onRegionFocus = function(platform, region) {
            this.selectedPlatform = platform;
            this.selectedRegion = region;
        };

        this.onRegionBlur = function(region) {
            region.isPopupOpen = false;
        };

    }
);
