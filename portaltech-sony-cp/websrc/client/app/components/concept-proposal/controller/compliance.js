angular.module('conceptProposal').controller('conceptProposalControllerCompliance',
function conceptProposalControllerCompliance( conceptWidgetServiceCompliance, $scope ) {

    this.fields = conceptWidgetServiceCompliance.fields;
    $scope.helper = function (item) {
        if(item == "YES") {
            return "Yes";
        } else if (item == "NO") {
            return "No";
        }
    };     
});
