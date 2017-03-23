describe('conceptProposalFactoryAPICache', function conceptProposalFactoryAPICache() {
    var $cacheFactory;
    var factory;

    beforeEach(function beforeEach() {
        module('conceptProposal');
        inject(function inject($injector) {
            factory = $injector.get('conceptProposalFactoryAPICache');
            $cacheFactory = $injector.get('$cacheFactory');
        });
    });

    it('returns a cache factory called "apiCache".', function returns() {
        expect(typeof factory).toBe('object');
        expect(factory.constructor).toBe($cacheFactory.get('apiCache').constructor);
    });
});
