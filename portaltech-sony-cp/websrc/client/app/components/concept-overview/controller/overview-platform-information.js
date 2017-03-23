
conceptProposal.controller('overviewPlatformInformationController',
    function overviewPlatformInformationController(
        conceptOverviewEditServiceModal,
        conceptCommonServiceManager,
        conceptOverviewServicePlatforms           
    ) {
        // Todo: We should not need this. We should be able to get everything we need out of
        // conceptProposalControllerReview.concept.field(fieldName).
        this.concept = conceptCommonServiceManager.concept();

        // Edit functions.
        this.edit = conceptOverviewEditServiceModal;

        // Exposes function for handling planned platform display.
        this.platforms = conceptOverviewServicePlatforms;  
    }
);

