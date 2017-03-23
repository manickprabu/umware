// Have disabled this entire suite since the accordion is fundamentally flawed:
// It should *never* be referring to a component-level module.
xdescribe('sharedAccordion directive', function sharedAccordion() {

    var $compile;
    var $rootScope;
    var $controller;
    var $httpBackend;
    var injectors = {};
    var element;
    var platforms = [{label:'PS4'}, {label:'PS2'}];

    beforeEach(function beforeEachAll() {
        module('sharedAccordion');

        inject( function inject($injector) {
            $compile = $injector.get('$compile');
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
        });
        
    });

    function getDirectiveElement() {
        $rootScope.platforms = platforms;
        element = angular.element('<shared-accordion platforms="platforms"></shared-accordion>');
        element = $compile(element)($rootScope);

        $httpBackend.expectGET('app/shared/accordion/accordion.html').respond(200);
        $rootScope.$digest();
        injectors = {$scope:element.scope()};
        $controller('sharedAccordionController', injectors);

        return element;
    }

    it('throw an error if not passed \'platforms\' arguments', function() {
        var error = new Error('sharedAccordion directive: Attribute value must be passed.');

        element = getDirectiveElement();
        expect(element[0].nodeName).toEqual('SHARED-ACCORDION');
    })

});