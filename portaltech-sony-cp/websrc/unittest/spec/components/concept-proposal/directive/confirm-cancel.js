	describe('ConfirmCancelModalTesting' , function ConfirmCancelModalTesting() {
	beforeEach(module('conceptProposal'));

	beforeEach(inject(function(_$rootScope_, _$compile_,_$controller_,$httpBackend) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        
        scope = $rootScope.$new();
        $uibModal =  jasmine.createSpyObj('$uibModal', ['close', 'open']);

        controller = _$controller_('conceptProposalConfirmCancelController', {$scope:scope, $uibModal: $uibModal}); 
        controller.options = {
  			body: "Are you sure?",
  			onConfirm: function(){
  				return true;
  			}
  		} 

  		element = getCompiledElement();  
    
    }));

    it("Confirm function should be defined" , function(){

    	expect(controller.confirm).toBeDefined();  

	});
	it("Close function should be defined", function(){	

		expect(controller.close).toBeDefined();

	});
	it("Close function should call modal close functon", function(){	

  		controller.modal = $uibModal; 		
  		controller.close();
  		expect($uibModal.close).toHaveBeenCalled();

	});
	it("Confirm function should call modal close functon and trigger onConfirm action", function(){	

  		controller.modal = $uibModal;
  		spyOn(controller.options,'onConfirm');  		
  		controller.confirm();
  		expect($uibModal.close).toHaveBeenCalled();  		
  		expect(controller.options.onConfirm).toHaveBeenCalled();

	});

	function getCompiledElement(){
		var element = angular.element("<div confirm-cancel='conceptProposalControllerProposal.confirmModalOptions'></div>");
		var compileElement = $compile(element)($rootScope);
		$rootScope.$digest();
		return compileElement;
	}

});