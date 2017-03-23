
angular.module('conceptProposal').controller('conceptProposalControllerProposal',
 function conceptProposalControllerProposal (
    $state,
    conceptCommonServiceField,
    messageBundleServiceCore,
    conceptWidgetServiceCore,
    conceptCommonServiceManager
) {
    this.confirmModalOptions = {
        body: messageBundleServiceCore.message('concept', 'proposal.cancelComfirmation'),
        onConfirm: angular.bind(this,function(){
            return this.reset();
        })
    }
    this.page = function page() {
        return $state.params.page;
    }

    this.config = conceptWidgetServiceCore;

    //// Prepoulate External feedback required checkbox
    this.externalReview = conceptCommonServiceField.field('proposal.externalFeedbackRequired');


    this.show = function (fieldName) {
        return conceptCommonServiceField.field(fieldName).visible();
    };

    this.reset = function () {
        //TO DO - need to write funtionality - to reset edited field value only (not eidire concept object)
        conceptCommonServiceManager.reset();
        $state.go('index.concept.listing');
    }
    // Toggle external review when i icon is selected
    this.selectExternalReview = function () {
        var externalReview = conceptCommonServiceField.field('proposal.externalFeedbackRequired').value();
        if(externalReview) {
            conceptCommonServiceField.field('proposal.externalFeedbackRequired').value(false);
        } else {
            conceptCommonServiceField.field('proposal.externalFeedbackRequired').value(true);
        }
    }
});
