describe('sharedMultiSelectFactory', function sharedMultiSelectFactory() {
    var factory;

    // Key-value object which would be used to set up a list.
    var kvs = {
        value1: 'label1',
        value2: 'label2',
        value3: 'label3'
    };

    beforeEach(function beforeEachAll() {
        module('sharedMultiSelect');
        inject(function inject($injector) {
            factory = $injector.get('sharedMultiSelectFactory');
        });
    });

    describe('returns an object when passed no arguments', function returnsAnObject() {
        var multiSelect;
        beforeEach(function beforeEachReturnsAnObject() {
            multiSelect = factory();
        });
        it('of type "object".', function ofTypeObject() {
            expect(typeof factory()).toBe('object');
        });
        describe('with properties:', function withProperties() {
            // Creates an expectation for a certain function to exist against the object.
            function exists(name) {
                it('is a function.', function isFunction() {
                    expect(typeof multiSelect[name]).toBe('function');
                });
            }
            describe('#select', function select() {
                exists('select');
                describe('returns', function returns() {
                    it('an array.', function anObject() {
                        expect(multiSelect.select().constructor).toBe([].constructor);
                    });
                    xit([
                        'the selected value-label object based on the id passed into it.'
                    ].join(' '), function selectedValueLabel() {
                        multiSelect.list(kvs);
                        expect(multiSelect.select(['value1']))
                            .toEqual({ value: 'value1', label: 'label1' });
                    });
                });
            });
        });
    });
});
