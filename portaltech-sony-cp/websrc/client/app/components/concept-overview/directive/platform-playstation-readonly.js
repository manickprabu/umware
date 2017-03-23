/*
    platform playstation read only directive just consume & print matrix data for platform-playstation data
    this does not capture any user interaction.
*/
angular.module('conceptOverview').directive('platformPlaystationReadonly', platformPlaystationReadonly); 
function platformPlaystationReadonly(
        conceptCommonServiceConfig, 
        conceptOverviewEditServiceModal,               
        conceptCommonServiceManager,
        conceptWidgetPlayStation, 
        conceptOverviewValidationServices        
    ) {
    return {
        restrict: 'A',
        transclude: true, 
        templateUrl: 'app/components/concept-overview/partial/platform-playstation-readonly.html',
        controller : conceptPlatformAvailabilityController,  
        controllerAs : 'vm',
        scope:{ }
    };

    function conceptPlatformAvailabilityController($scope) {
    	var vm = this; 

        // Edit functions.
        this.edit = conceptOverviewEditServiceModal; 

        // Record function to output object on digest cycle.
        this.concept = conceptCommonServiceManager.concept();

        vm.competitorRegions = conceptCommonServiceConfig.config('competitorRegions');
        vm.competitorMatrixArray = conceptWidgetPlayStation.getMatrixData();       

        // Please read the information inside this service for this check
        vm.partnersWithdrawnCheckPlatform = conceptOverviewValidationServices.partnersWithdrawnCheck();        
    };
};