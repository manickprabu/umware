angular.module('conceptOverviewEdit').controller('conceptProposalControllerReviewEdit',
function conceptProposalControllerReviewEdit($uibModalInstance, conceptWidgetServiceCore) {
    this.config = conceptWidgetServiceCore;
    this.instance = $uibModalInstance;
});
