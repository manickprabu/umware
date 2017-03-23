describe('sharedFactoryInstantiator', function () {
    var factory;
    beforeEach(function () {
        module('sharedInstantiator');
        inject(function ($injector) {
            factory = $injector.get('sharedInstantiatorFactory');
        });
    });
    it('is a function', function () {
        expect(typeof factory).toBe('function');
    });
    it('returns the first argument passed into it.', function () {
        var obj = {};
        expect(factory(obj, {}, [])).toBe(obj);
    });
    it('throws an error if the first argument is not an object.', function () {
        function throwException(instance) {
            expect(function () {factory(instance);}).toThrow(new Error([
                'sharedInstantiatorFactory(instance, options, validOptions):',
                'requires an object as the first argument.',
                typeof instance,
                'passed.'
            ].join(' ')));
        }
        throwException();
        throwException(0);
        throwException(1);
        throwException('string');
    });
    describe('takes arguments in the form of', function () {
        describe('an options object', function () {
            it('which errors if not an object.', function () {
                function throwException(options) {
                    expect(function () {factory({}, options);}).toThrow(new Error([
                        'sharedInstantiatorFactory(instance, options, validOptions):',
                        '"options" argument should be an object. Passed a',
                        (typeof options)
                    ].join(' ')));
                }
                throwException();
                throwException(0);
                throwException(1);
                throwException('string');
            });
        });
    });
});
