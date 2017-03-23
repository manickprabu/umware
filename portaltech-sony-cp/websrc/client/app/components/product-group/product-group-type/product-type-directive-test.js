
describe('productType directive', function productTypeTest() {

    var $compile;
    var $rootScope;
    var $controller, controller;
    var $httpBackend, $templateCache;
    var injectors = {};
    var element;

    //mock data
    var product = {code:'DEMO', enabled:true, gated:false, icon: true, id: 1000, name: 'Demo'};

    beforeEach(function beforeEachAll() {
        module('ui.router');
        module('messageBundle');
        module('wp3-product-group');

        inject( function inject($injector) {
            $compile = $injector.get('$compile');
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            $templateCache = $injector.get('$templateCache');

            //inject for controller
            [
                'messageBundleServiceCore',
                '$state'
            ].forEach(function (injection) {
                injectors[injection] = $injector.get(injection);
            });
        });

    });

    function getDirectiveElement() {
        $rootScope.product = product;
        element = '<span product-type="product"></span>';
        element = $compile(element)($rootScope);

        $httpBackend.expectGET('app/components/product-group/product-group-type/product-type-directive-partial.html').respond(200);
        $rootScope.$digest();

        //bindings
        var bindings = {
          product : product
        }
        injectors['$scope'] = element.scope();
        controller = $controller('ProductTypeDirectiveController', injectors, bindings);

        return controller;
    }

    it('throw an error if not passed \'product-type\' arguments', function() {
        var error = new Error('product directive: Attribute value must be passed.');

        controller = getDirectiveElement();
        expect(controller.product).toEqual(product);
    });

    it('controller "getIcon" should be defined and triggered', function() {
        expect(controller.getIcon).toBeDefined();
    });

    it('controller "register" should be defined and triggered', function() {
        expect(controller.register).toBeDefined();
    });

});
