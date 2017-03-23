
conceptProposal.controller('platformExclusiveContentEditController',
    function platformExclusiveContentEditController(
        conceptWidgetServiceCore,
        conceptCommonServiceManager,
        conceptOverviewModel
    ) {
        this.concept = conceptCommonServiceManager.concept();
        this.fields = conceptOverviewModel.fields();
        
        this.field = conceptWidgetServiceCore.createYesNoField(this.fields.exclusiveAtLaunch);
    }
);

