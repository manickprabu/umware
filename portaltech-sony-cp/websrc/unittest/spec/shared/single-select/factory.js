describe('sharedSingleSelectFactory', function sharedSingleSelectFactory() {
    var factory;

    // Key-value object which would be used to set up a list.
    var kvs = {
        value1: 'label1',
        value2: 'label2',
        value3: 'label3'
    };

    beforeEach(function beforeEachAll() {
        module('sharedSingleSelect');
        inject(function inject($injector) {
            factory = $injector.get('sharedSingleSelectFactory');
        });
    });

    describe('returns an object when passed no arguments', function returnsAnObject() {
        var dropdown;
        beforeEach(function beforeEachReturnsAnObject() {
            dropdown = factory();
        });
        it('of type "object".', function ofTypeObject() {
            expect(typeof factory()).toBe('object');
        });
        describe('with properties:', function withProperties() {
            // Creates an expectation for a certain function to exist against the object.
            function exists(name) {
                it('is a function.', function isFunction() {
                    expect(typeof dropdown[name]).toBe('function');
                });
            }
            describe('#select', function select() {
                exists('select');
                xdescribe('returns', function returns() {
                    it('an object.', function anObject() {
                        expect(typeof dropdown.select()).toBe('object');
                    });
                    it([
                        'the selected value-label object based on the id passed into it.'
                    ].join(' '), function selectedValueLabel() {
                        dropdown.list(kvs);
                        expect(dropdown.select('value1'))
                            .toEqual({ value: 'value1', label: 'label1' });
                    });
                });
            });
        });
    });
});
