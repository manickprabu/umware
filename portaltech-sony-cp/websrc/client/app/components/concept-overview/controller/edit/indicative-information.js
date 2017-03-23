
conceptProposal.controller('indicativeInformationEditController',
    function indicativeInformationEditController(
        conceptWidgetServiceCore,
        conceptCommonServiceManager,
        conceptOverviewModel,
        conceptWidgetServiceCompliance,
        conceptCommonServiceField,
        messageBundleServiceCore
    ) {
        this.concept = conceptCommonServiceManager.concept();
        this.fields = conceptOverviewModel.fields();
        this.config = conceptWidgetServiceCore;
        this.complianceFields = conceptWidgetServiceCompliance.fields;

        //// Prepoulate External feedback required checkbox
        this.field ={
            value : conceptCommonServiceField.field('proposal.externalFeedbackRequired').value,
            label : messageBundleServiceCore.message('concept', 'proposal.externalFeedbackRequired.name')
        };
    }
);