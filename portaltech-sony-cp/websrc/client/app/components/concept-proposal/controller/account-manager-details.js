angular.module('conceptProposal')
    .controller('conceptProposalControllerAccountManagerDetails',
        function(messageBundleServiceCore, $uibModalInstance, $scope){

            this.modal = $uibModalInstance;

            this.concept = $scope.$resolve.concept;

            this.message = function(key) {
                return messageBundleServiceCore.message('concept', key);
            };
            this.closeModal = function(){
                this.modal.close();
        };
    }
);
