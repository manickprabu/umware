describe('sharedDropdownFactoryFirst', function sharedDropdownFactoryFirst() {
    var factory;

    beforeEach(function beforeEachAll() {
        module('sharedDropdown');
        inject(function inject($injector) {
            factory = $injector.get('sharedDropdownFactoryFirst');
        });
    });

    describe('returns an object when passed no arguments', function returnsAnObject() {
        var first;
        beforeEach(function beforeEachReturnsAnObject() {
            first = factory();
        });
        it('of type "object".', function ofTypeObject() {
            expect(typeof factory('stuff', function () {})).toBe('object');
        });
        describe('with properties:', function withProperties() {
            // Creates an expectation for a certain function to exist against the object.
            function describeFunction(name, fnc) {
                describe('#' + name, function describeFunctionProperty() {
                    it('is a function.', function isFunction() {
                        expect(typeof first[name]).toBe('function');
                    });
                    fnc();
                });
            }
            describeFunction('click', function click() {
                it('returns a function which will persist when set.', function () {
                    function a() {};
                    function b() {return true;};
                    expect(typeof first.click()).toBe('function');
                    expect(first.click()()).toBe(undefined);
                    expect(first.click(a)).toBe(a);
                    expect(first.click()).toBe(a);
                    expect(first.click(b)).toBe(b);
                    expect(first.click()).toBe(b);
                });
                it('throws an exception when set with a non-function', function () {
                    function expectThrow(value) {
                        expect(function () {
                            first.click(value);
                        }).toThrow(new Error([
                            'sharedDropdownFactoryFirst(instance).click: Argument must be a function,',
                            (typeof value),
                            'provided.'
                        ].join(' ')));
                    }
                    expectThrow('string');
                    expectThrow({});
                    expectThrow([]);
                    expectThrow(false);
                    expectThrow(0);
                    expectThrow(true);
                    expectThrow(101);
                });
            });
            describeFunction('label', function label() {
                it('returns a label which will persist when set.', function () {
                    expect(first.label()).toBe('(Unlabelled)');
                    expect(first.label('labelled')).toBe('labelled');
                    expect(first.label()).toBe('labelled');
                    expect(first.label('stuff')).toBe('stuff');
                    expect(first.label()).toBe('stuff');
                });
                it('throws an exception when set with a non-string', function () {
                    function expectThrow(value) {
                        expect(function () {
                            first.label(value);
                        }).toThrow(new Error([
                            'sharedDropdownFactoryFirst(instance).label: Argument must be a string,',
                            (typeof value),
                            'provided.'
                        ].join(' ')));
                    }
                    expectThrow({});
                    expectThrow([]);
                    expectThrow(false);
                    expectThrow(0);
                    expectThrow(true);
                    expectThrow(101);
                    expectThrow(function testFunction() {});
                });
            });
        });
    });
});
