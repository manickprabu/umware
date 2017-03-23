describe('sharedDropdownFactoryCore', function sharedDropdownFactoryCore() {
    var factory;

    beforeEach(function beforeEachAll() {
        module('sharedDropdown');
        inject(function inject($injector) {
            factory = $injector.get('sharedDropdownFactoryCore');
        });
    });

    it('is a function.', function () {
        expect(typeof factory).toBe('function');
    });

    // Function returns an object which includes the placeholder property,
    // which is no longer relevant to the options factory, and only relevant
    // to the dropdown.
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
            describe('#placeholder', function placeholder() {
                exists('placeholder');
                describe('returns', function returns() {
                    it('"Select an option" if not set.', function aString() {
                        expect(dropdown.placeholder()).toBe('Select an option');
                    });
                    it('the string it is set to.', function theValue() {
                        expect(dropdown.placeholder('value')).toBe('value');
                        expect(dropdown.placeholder()).toBe('value');
                        expect(dropdown.placeholder('string')).toBe('string');
                        expect(dropdown.placeholder()).toBe('string');
                    });
                });
                it('throws an exception if passed a non-string.', function throwsException() {
                    function runExpectation(value) {
                        expect(function runPlaceholder() {
                            dropdown.placeholder(value);
                        }).toThrow(new Error([
                            'sharedDropdownInstance.placeholder:',
                            'Expecting a string parameter, but was passed a ',
                            (typeof value)
                        ].join(' ')));
                    }
                    runExpectation({});
                    runExpectation([]);
                    runExpectation(true);
                    runExpectation(false);
                    runExpectation(0);
                    runExpectation(1);
                    runExpectation(1.1);
                });
            });
        });
    });
});
