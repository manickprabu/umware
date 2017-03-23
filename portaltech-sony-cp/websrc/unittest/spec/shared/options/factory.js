describe('sharedOptionsFactory', function sharedOptionsFactory() {
    var factory;

    // Key-value object which would be used to set up a list.
    var kvs = {
        value1: 'label1',
        value2: 'label2',
        value3: 'label3'
    };

    // A list of items which would be returned.
    var items = [
        {
            label: 'label1',
            value: 'value1'
        },
        {
            label: 'label2',
            value: 'value2'
        },
        {
            label: 'label3',
            value: 'value3'
        }
    ];

    beforeEach(function beforeEachAll() {
        module('sharedOptions');
        inject(function inject($injector) {
            factory = $injector.get('sharedOptionsFactory');
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
            describe('#list', function list() {
                exists('list');
                it('returns an array.', function returnsArray() {
                    expect(dropdown.list().constructor).toBe([].constructor);
                });
                it([
                    'can be passed an object of key-value pairs',
                    'to return an array of value-label objects.'
                ].join(' '), function kvPairs() {
                    // Using .toEqual no longer confirms when two arrays have the same
                    // objects or equality, so I'm using this 'improvement' instead.
                    expect(dropdown.list(kvs).join('')).toBe(items.join(''));
                    expect(dropdown.list().join('')).toBe(items.join(''));
                });
                it('throws an error if passed a non-object.', function throwsAnError() {
                    // Sets up an expectation for the error thrown based on the input value.
                    function expectThrow(value) {
                        expect(function setList() { dropdown.list(value); }).toThrow(new Error([
                            'sharedOptionsFactory.list: Can only be passed an object.',
                            (typeof value),
                            'found.'
                        ].join(' ')));
                    }
                    expectThrow(false);
                    expectThrow(1);
                    expectThrow('stuff');
                });
            });
        });
    });
});
