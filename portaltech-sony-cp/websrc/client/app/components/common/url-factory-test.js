
describe('URLFactory factory', function URLFactoryTest() {

    var URLFactory;

    beforeEach(function() {
        module('common');
    });

    beforeEach(function beforeEachAll() {

        inject( function inject($injector) {
            URLFactory = $injector.get('URLFactory');
        });

    });

    it('throw an error if not defined \'URLFactory\' service', function() {
        expect(URLFactory).toBeDefined();
    });

    it('URLFactory "headers" should be defined', function() {
        expect(URLFactory.headers).toBeDefined();
    });

    it('URLFactory "productGroupTypes" should be defined', function() {
        expect(URLFactory.productGroupTypes).toBeDefined();
    });

});
