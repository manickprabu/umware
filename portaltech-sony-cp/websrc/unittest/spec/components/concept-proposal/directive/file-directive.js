describe('fileDirective' , function fileDirective() {

	var compile, mockBackend, rootScope, scope;

	beforeEach(inject(function(_$rootScope_, _$compile_,_$controller_,$httpBackend) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
		compile = _$compile_;
		mockBackend = $httpBackend;
		rootScope = _$rootScope_;
		scope = rootScope.$new();
		controller = _$controller_('conceptProposalControllerProposal',{$scope:scope});
    
    }));


    it("Should return a file upload window" , function(){

    	mockBackend.expectGET('app/shared/file/file-upload.html').respond('<div>YOU ARE A </div>');

    	var element = compile(angular.element('<div shared-file="conceptProposalControllerProposal.config.gameDesignDocumentEN" field-language="en"></div>'))(scope);

      	scope.$digest();
       
        console.log(element.html());


    	expect(1).toEqual(1);  

	});

	function getCompiledElement(){
		var element = angular.element('<shared-paginator options="conceptProposalControllerListing.paginationOptions"></shared-paginator>');
		var compileElement = $compile(element)($rootScope);
		$rootScope.$digest();
		return compileElement;
	}

});