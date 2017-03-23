describe('PaginationTesting' , function PaginationTesting() {
	beforeEach(module('sharedPaginator'));

	beforeEach(inject(function(_$rootScope_, _$compile_,$httpBackend) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $httpBackend.expectGET("app/shared/pagination/pagination.html").respond("")
        element = getCompiledElement();
    }));

    it("Template binding to html" , function(){	    
    	expect(element).not.toEqual("");    	
	});

	function getCompiledElement(){
		var element = angular.element('<shared-paginator options="conceptProposalControllerListing.paginationOptions"></shared-paginator>');
		var compileElement = $compile(element)($rootScope);
		$rootScope.$digest();
		return compileElement;
	}

});