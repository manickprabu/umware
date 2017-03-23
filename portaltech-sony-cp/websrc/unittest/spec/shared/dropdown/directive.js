describe('sharedDropdown directive', function sharedDropdown() {
    var $compile;
    var $element;
    var $httpBackend;
    var factory;
    var $rootScope;
    var $scope;
    var $controller;
    var injections = {};

    function runDirective(dropdown, firstItem) {
        return function runIt() {
            $rootScope.dropdown = dropdown;
            $rootScope.firstItem = firstItem;
            $scope = $rootScope;
            $element = $compile([
                '<div data-shared-dropdown="dropdown"',
                (firstItem !== undefined ? 'data-first-item="firstItem"' : ''),
                '></div>'
            ].join(''))($scope);
            $httpBackend.expectGET('app/shared/dropdown/partial/index.html').respond(200);
            if (firstItem !== undefined) {
                injections.$attrs.$attr.firstItem = 'firstItem';
            } else {
                injections.$attrs.$attr = {};
            }
            $scope.$digest();
            $controller('sharedDropdownController', injections, $element.scope());
        };
    }

    beforeEach(function beforeEachAll() {
        module('sharedDropdown');
        inject(function inject($injector) {
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            factory = $injector.get('sharedOptionsFactory');
            $httpBackend = $injector.get('$httpBackend');
            $controller = $injector.get('$controller');
            [
                'sharedOptionsFactory',
                'sharedDropdownFactoryFirst'
            ].forEach(function (injection) {
                injections[injection] = $injector.get(injection);
            });
            injections.$attrs = {
                $attr: {}
            };
        });
    });

    it('#dropdown is the sharedOptionsFactory instance passed into it.', function dropdown() {
        runDirective(factory({ x: 'x', y: 'y' }))();
        expect($element.scope().dropdown.constructor).toBe(factory().constructor);
    });

    it('throws an error if not passed a sharedOptionsFactory instance.', function instance() {
        var error = new Error([
            'sharedDropdown directive:',
            'Attribute value must be passed a sharedDropdownFactoryCore instance.'
        ].join(' '));
        expect(runDirective('whatever')).toThrow(error);
        expect(runDirective(1)).toThrow(error);
        expect(runDirective(0)).toThrow(error);
        expect(runDirective()).toThrow(error);
        expect(runDirective(false)).toThrow(error);
        expect(runDirective(true)).toThrow(error);
        expect(runDirective({})).toThrow(error);
    });
    it([
        'throws an error if passed a first-item object which is not a sharedDropdownFactoryFirst.'
    ].join(''), function instance() {
        function expectThrow(value) {
            expect(runDirective(factory({ x: 'x', y: 'y' }), value)).toThrow(new Error([
                'sharedDropdown directive:',
                'first-item attribute must be passed a sharedDropdownFactoryFirst instance.'
            ].join(' ')));
        }
        expectThrow('whatever');
        expectThrow(0);
        expectThrow(1);
        expectThrow(false);
        expectThrow(true);
        expectThrow({});
    });
});
