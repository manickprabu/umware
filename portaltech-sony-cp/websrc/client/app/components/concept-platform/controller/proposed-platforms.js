
// Controller for Proposal Platform

conceptProposal.directive('conceptProposalPlatform', function(){
    return {
        restrict: 'E',
        scope: {
            platformName: '='
        },
        bindToController: true,
        controllerAs: 'conceptProposalPlatformController',
        controller : 'conceptProposalPlatformController',
        templateUrl: 'app/components/concept-platform/partial/proposed-platform-accordion.html'
    }
});

conceptProposal.controller('conceptProposalPlatformController',
    function conceptProposalPlatformController(
        $scope,
        conceptCommonServiceField,
        conceptProposalPlatformDataModel, 
        conceptWidgetServiceCore
    ) {
        //TO DO: need to remove
        $scope.platformName = this.platformName;

        this.platformModel = conceptProposalPlatformDataModel;
        this.config = conceptWidgetServiceCore;

        this.fields = conceptProposalPlatformDataModel.getFieldList(this.platformName);
        this.exclusiveAtLaunch = conceptWidgetServiceCore.createYesNoField(this.fields.exclusiveAtLaunch);

        this.show = function(fieldName) {
            if (fieldName !== undefined) {
                return conceptCommonServiceField.field(fieldName).visible();
            }
        }
    }
);
