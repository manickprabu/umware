
describe('ProductGroupTypeService', function  ProductGroupTypeServiceTest() {

    var Service;
    var $httpBackend
    var injectors = {};

    beforeEach(function() {
        module('ui.router');
        module('wp3-product-group');
    });

    beforeEach(function beforeEachAll() {

        inject( function inject($injector) {
            Service = $injector.get('ProductGroupTypeService');
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            $templateCache = $injector.get('$templateCache');
        });
    });

    it('throw an error if not defined \'Service\' service', function() {
        expect(Service).toBeDefined();
    });

    it('Service "loadProductType" should be defined', function() {
        expect(Service.loadProductType).toBeDefined();
    });

    it('Service "getProductIcon" should be defined', function() {
        expect(Service.getProductIcon).toBeDefined();
    });

});
