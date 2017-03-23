// Todo:
// 1 - Absolutely NO components should be named without their module name as a prefix.
// 2 - All the functionality this contains can be found within the concept service.
// This merely wraps the concept service and does nothing else.
// 3 - Partials call functionality straight out of this 'helper'. That means they will most likely
// be silent on failures when attempting to remove this service, which means every page will have
// to be checked manually for errors.
// Conclusion: This service needs to be removed.

angular.module('conceptProposal').service('UIHelperDELETED',
    function conceptProposalController(
        conceptCommonServiceField
    ) {
        this.show = function(fieldName) {
            if (fieldName !== undefined) {
                return conceptCommonServiceField.field(fieldName).visible();
            }
        }
    }
);