angular.module('conceptProposal').directive('conceptProposalTextField',
function (conceptCommonServiceField) {
    return {
        scope: {
            name: '@conceptProposalTextField'
        },
        templateUrl: 'app/components/concept-proposal/partial/directive/text-field.html',
        bindToController: true,
        controllerAs: 'conceptProposalControllerTextField',
        controller: function controller() {
            this.field = conceptCommonServiceField.field(this.name);
        }
    };
});
