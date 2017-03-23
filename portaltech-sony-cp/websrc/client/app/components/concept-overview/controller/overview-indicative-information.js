/* 
* this controller is for overview page->indicative information(tap)
*/

conceptProposal.controller('overviewIndicativeInformationController',
    function overviewIndicativeInformationController(
        conceptOverviewEditServiceModal,
        conceptCommonServiceManager,       
        conceptWidgetServicePlannedRegions,
        conceptWidgetServiceCore,
        conceptCommonServiceField
    ) {

        this.concept = conceptCommonServiceManager.concept();

        this.config = conceptWidgetServiceCore;

        //pull internal document - read only
        this.config.fileAttachment({'reviewAttachments':'proposal.overview.attachments'});
        if(this.concept.proposal) {
            var feedbackObject = this.concept.proposal.feedbackWsDTO;
            if((feedbackObject) && (feedbackObject.feedbackDocument)) {
                conceptCommonServiceField.field("proposal.overview.attachments").value( [feedbackObject.feedbackDocument] );
            };
        };


        // Edit functions.
        this.edit = conceptOverviewEditServiceModal;      

        /// Get the planned regions from the configuration
        this.proposalRegions = angular.copy(conceptWidgetServicePlannedRegions.getPlannedRegions());  

        var source = angular.copy(this.concept.proposal.regions);
        /*
        *  Here now get those selected regions from the all regions
        *  Make them active and add label controls
        *  So that they can be used in bootstrap pills
        */
        this.proposalRegions = this.proposalRegions.map(
            angular.bind(this, function proposalRegionsMap(region) { 
                
                region.active = source.map(function (active) {                   
                    return active.code;
                }).indexOf(region.code) > -1;

                /// Need to add lable as bootstrap pills takes label to display the information
                region.label = region.code; 
                return region;
            })
        );
        
    }
);

