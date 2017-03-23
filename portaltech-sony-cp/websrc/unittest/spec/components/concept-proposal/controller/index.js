describe('conceptProposalControllerIndex', function () {
    var $controller;
    beforeEach(function () {
        module('conceptProposal');
        inject(function ($injector) {
            $controller = $injector.get('$controller');
            $controller('conceptProposalControllerIndex', {
                $scope: $injector.get('$rootScope').$new(),
                sharedDropdownFactoryCore: $injector.get('sharedDropdownFactoryCore')
            });
        });
    });

    it('exists', function () {
        expect(true).toBe(true);
    });
});
