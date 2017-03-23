describe('PopoverTesting', function PopoverTesting() {
    // Load the myApp module, which contains the directive
    beforeEach(module('conceptProposal'));

    // Store references to $rootScope and $compile so they are 
    // available to all tests in this describe block
    beforeEach(inject(function(_$rootScope_, _$compile_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('Click on "i" icon for popover-trigger', function () {
        // Compiled piece of HTML containing the directive
        var element = $compile('<a uib-popover="Unit Testing Popover" popover-trigger="outsideClick" popover-placement="top"><i class="fa fa-info-circle"></i></a>')($rootScope);
        // fire all the watches, so the scope expression express will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the template content
        expect(element.html()).toContain("fa-info-circle");
    });

    //TODO: Test for a scenario that will trigger uipopover CONTENT
    xit('should show some custom content within the popover', function () {
        // Compiled piece of HTML containing the directive
        var element = $compile('<a uib-popover="Unit Testing Popover" popover-trigger="outsideClick" popover-placement="top"><i class="glyphicon glyphicon-info-sign"></i></a>')($rootScope);
        // fire all the watches, so the scope expression express will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the template content
        expect(element('attr')).toContain('Unit Testing Popover');
    });
});
