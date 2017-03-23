angular.module('conceptProposal').directive('conceptProposalRow', function () {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            required: '@',
            label: '@',
            id: '@',
            information: '@'
        },
        controllerAs: 'conceptProposalControllerRow',
        templateUrl: 'app/components/concept-proposal/partial/directive/row.html',
        controller: function ($scope) {
            this.required = function () {return $scope.required === 'true';}
            this.label = function () {return $scope.label;}
            this.information = function () {return $scope.information;}
            this.id = function () {return $scope.id;}
              
            // this section helps you position the popover 
            $scope.placement = {
              options: [
                'top',
                'top-left',
                'top-right',
                'bottom',
                'bottom-left',
                'bottom-right',
                'left',
                'left-top',
                'left-bottom',
                'right',
                'right-top',
                'right-bottom'
              ],
              selected: 'right'
            };
        }
    };
});
