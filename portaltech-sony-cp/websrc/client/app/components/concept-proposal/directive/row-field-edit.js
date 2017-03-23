angular.module('conceptProposal').directive('conceptProposalRowFieldEdit', function (conceptCommonServiceField) {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            conceptProposalRowFieldEdit: '@'
        },
        bindToController: true,
        controllerAs: 'conceptProposalControllerRowFieldEdit',
        templateUrl: 'app/components/concept-proposal/partial/directive/row-field-edit.html',
        controller: function () {
            this.field = conceptCommonServiceField.field(this.conceptProposalRowFieldEdit);
        }
    };
});
