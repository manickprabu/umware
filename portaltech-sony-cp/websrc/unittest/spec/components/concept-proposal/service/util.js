describe('util', function util() {
    var service;

    beforeEach(function beforeEach() {
        module('conceptProposal');
        inject(function injector($injector) {
            service = $injector.get('util');
        });
    });

    describe('arrToJsonKeys', function() {

        it('should return an empty json object if passed a null array', function() {
            // act
            var result = service.arrToJsonKeys(null);

            // assert
            expect(JSON.stringify(result)).toBe('{}');
        });

        it('should transform array to json object correctly', function() {
            var mockArr = ['item1', 'item2', 'item3'];
            // act
            var result = service.arrToJsonKeys(mockArr);

            // assert
            expect(result.item1).toBe('item1');
            expect(result.item2).toBe('item2');
            expect(result.item3).toBe('item3');
        });
    });
});
