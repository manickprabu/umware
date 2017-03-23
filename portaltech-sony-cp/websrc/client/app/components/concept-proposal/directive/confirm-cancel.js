angular.module('conceptProposal')
.controller('conceptProposalConfirmCancelController', function($uibModal){

			/* Dependencies - confirmCancel modal properties
				 confirmCancel.body - modal body text/title
				 confirmCancel.onConfirm - function to execute on confirmation
			*/

			this.options = this.confirmCancel;

			// Execute on 'No' answer
			this.close = function() {
				this.modal.close();
			};

			// Execute on 'Yes' (confirmation)
			this.confirm = function() {
				this.modal.close();
				if(typeof this.options.onConfirm !== 'undefined'){
					this.options.onConfirm();
				}
			}
})
.directive('confirmCancel', function($uibModal){
	return {
		restrict: 'A',
		scope: {
			confirmCancel: '='
		},
		bindToController: true,
		controllerAs: 'conceptProposalConfirmCancelController',
		controller : 'conceptProposalConfirmCancelController',
		link: function(scope,el,attr,ctrl){

			el.bind('click',function() {
			// Set modal instance to controller object
				ctrl.modal = $uibModal.open({
	                templateUrl: 'app/components/concept-proposal/partial/confirm-cancel-modal.html',
	                scope: scope
				});
            });

		}

	}
});
