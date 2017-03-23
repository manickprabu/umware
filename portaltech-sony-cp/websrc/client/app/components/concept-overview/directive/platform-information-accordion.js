/*
    this accordion directive is used only on overview page -> platform information (tap)
*/
angular.module('conceptOverview').directive('platformInformationAccordion', platformInformationAccordion); 

function platformInformationAccordion(conceptOverviewEditServiceModal, conceptCommonServiceManager, conceptOverviewValidationServices) {    

    return {
        restrict: 'A',
        transclude: true, 
        templateUrl: 'app/components/concept-overview/partial/platform-information-accordion.html',
        controller : conceptPlatformAccordionController,  
        controllerAs : 'vm',  
        transclude : true,    
        scope : { }        
    };

    function conceptPlatformAccordionController() {
    	var vm = this;         

        // Edit functions.
        this.edit = conceptOverviewEditServiceModal;
        vm.concetReview = conceptCommonServiceManager.concept();

        if(vm.concetReview) {
            vm.PlannedPlatforms = this.concetReview.proposal.plannedPlatforms; 
            vm.Regions = this.concetReview.proposal.regions;  

            /// Please read the information inside this service for this check
            vm.partnersWithdrawnCheckAccordion = conceptOverviewValidationServices.partnersWithdrawnCheck();
        }

        /// This is to show hide accordion on click
        vm.selected = {};         
    };
};