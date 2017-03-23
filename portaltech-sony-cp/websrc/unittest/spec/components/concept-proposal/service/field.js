describe('conceptProposalServiceField', function () {
    var service;

    function exists(name) {
        it('is a function.', function isFunction() {
            expect(typeof service[name]).toBe('function');
        });
    }

    beforeEach(function () {
        module('conceptProposal');
        inject(function ($injector) {
            service = $injector.get('conceptProposalServiceField');
        });
    });

    // Field property holds the constructor.
    describe('#Field', function () {
        exists('Field');
        it('is a constructor which can be instantiated.', function () {
            expect(typeof new service.Field).toBe('object');
        });
        describe('instance', function () {
            var instance;
            function hasFunction(name) {
                it('is a function.', function isFunction() {
                    expect(typeof instance[name]).toBe('function');
                });
            }
            beforeEach(function () {
                instance = new service.Field;
            });
            describe('#name', function () {
                hasFunction('name');
                it('returns the string it is set to.', function () {
                    expect(instance.name('x')).toBe('x');
                    expect(instance.name()).toBe('x');
                    expect(instance.name('y')).toBe('y');
                    expect(instance.name()).toBe('y');
                });
            });
            describe('#label', function () {
                hasFunction('label');
            });
            describe('#triggerUpdate', function () {
                hasFunction('triggerUpdate');
                describe('returns', function () {
                    it('"false" by default.', function () {
                        expect(instance.triggerUpdate()).toBe(false);
                    });
                    it('the value it is set to.', function () {
                        expect(instance.triggerUpdate(true)).toBe(true);
                        expect(instance.triggerUpdate()).toBe(true);
                        expect(instance.triggerUpdate(false)).toEqual(false);
                        expect(instance.triggerUpdate()).toEqual(false);
                    });
                });
            });
            describe('#value', function () {
                hasFunction('value');
                it('returns the value it is set to.', function () {
                    expect(instance.value('x')).toBe('x');
                    expect(instance.value()).toBe('x');
                    expect(instance.value({})).toEqual({});
                    expect(instance.value()).toEqual({});
                });
            });
            describe('#required', function () {
                hasFunction('required');
                it([
                    'can be passed an argument which will persist and throw an error if not boolean.'
                ].join(' '), function () {
                    function expectThrown(value) {
                        expect(function () { instance.required(value); }).toThrow(new Error([
                            'conceptProposalServiceField.Field instance.required:',
                            'Argument must be boolean, found',
                            (typeof value)
                        ].join(' ')));
                    }
                    expect(instance.required(true)).toBe(true);
                    expect(instance.required()).toBe(true);
                    expect(instance.required(false)).toBe(false);
                    expect(instance.required()).toBe(false);
                    expect(function () { instance.required(true); }).not.toThrowError();
                    expect(function () { instance.required(false); }).not.toThrowError();
                    expectThrown(0);
                    expectThrown(1);
                    expectThrown(1.1);
                    expectThrown('a string');
                    expectThrown({});
                    expectThrown([]);
                });
                describe('returns', function () {
                    it('false by default.', function () {
                        expect(instance.required()).toBe(false);
                    });
                    it('the value it is set to.', function () {
                        expect(instance.required()).toBe(false);
                    });
                });
            });
            describe('#messages', function () {
                hasFunction('messages');
                describe('#validation', function () {
                    it('is a function.', function isFunction() {
                        expect(typeof instance.messages().validation).toBe('function');
                    });
                    it('returns an array.', function isFunction() {
                        expect(instance.messages().validation().constructor).toBe([].constructor);
                    });
                });
            });
        });
    });

    // To instantiate the constructor there is a function.
    describe('#create', function () {
        exists('create');
        it('returns a new Field object.', function () {
            expect(service.create().constructor).toBe(service.Field);
        });
    });
});
