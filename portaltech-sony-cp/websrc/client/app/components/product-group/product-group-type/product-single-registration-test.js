
describe('SingleRegistrationController Controller', function SingleRegistrationControllerTest() {

    var $rootScope;
    var $controller, controller;
    var injectors = {};

    beforeEach(function beforeEachAll() {
        module('ui.router');
        module('wp3-product-group');

        inject( function inject($injector) {
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');

            //inject for controller
            [
                'ProductGroupTypeService',
                '$stateParams'
            ].forEach(function (injection) {
                injectors[injection] = $injector.get(injection);
            });
        });

    });

    function getController() {
        //bindings
        injectors['$scope'] = $rootScope;
        controller = $controller('SingleRegistrationController', injectors);

        return controller;
    }

    it('controller "SingleRegistrationController" should be defined', function() {
        controller = getController();
        expect(controller).toBeDefined();
    });

});
