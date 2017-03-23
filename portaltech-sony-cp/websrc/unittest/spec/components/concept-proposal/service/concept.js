describe('conceptProposalServiceConcept', function () {
    var service;
    var services = {};

    var mockInitResponse = {
        formFields: [],
        validationFields: []
    };

    var mockConfigResponse = [];

    function exists(name) {
        it('is a function.', function isFunction() {
            expect(typeof service[name]).toBe('function');
        });
    }

    beforeEach(function () {
        module('conceptProposal');
        inject(function ($injector) {
            service = $injector.get('conceptProposalServiceConcept');
            [
                'conceptProposalServiceAPI',
                'conceptProposalServiceField',
                '$httpBackend',
                '$q'
            ].forEach(function (name) {
                services[name] = $injector.get(name);
            });
        });
    });

    describe('#initialise', function () {
        it('initialise should return a promise', function () {
            // ensure all the end points are called
            services.$httpBackend
                .expectGET('/sonycpocc/v2/sonycp/users/current')
                .respond({});

            services.$httpBackend
                .expectPUT('/sonycpocc/v2/sonycp/concepts/init')
                .respond(mockInitResponse);

            services.$httpBackend
                .expectGET('/sonycpocc/v2/sonycp/concepts/configuration')
                .respond(mockConfigResponse);

            services.$httpBackend
                .expectGET('/sonycpocc/v2/sonycp/franchises')
                .respond(mockConfigResponse);

            services.$httpBackend
                .expectGET('/sonycpocc/v2/sonycp/genres')
                .respond({});

            // act
            expect(service.initialise().constructor).toBe(services.$q.defer().promise.constructor);

            services.$httpBackend.flush();
        });
    });

    // raw object is at properties.partnerRoles.roles
    describe('#validate', function () {
        exists('validate');
    });

    describe('#role', function () {
        exists('role');
        describe('returns', function () {
            it('a string.', function () {
                expect(service.role()).toBe('');
            });
            xit('the user-interface option given from the API object.', function () {
                services.$httpBackend.expectGet('api/concept/endpoint').respond({
                    partnerRoles: []
                });
            });
        });
        // We write a function to test for various instances of the typeof value.
        it('can be passed a string.', function () {
            function thrown(value) {
                return new Error([
                    'conceptProposalServiceConcept.role: Setting invalid role.',
                    'Expecting a string, got ' + (typeof value)
                ].join(''));
            }
            expect(service.role('a string')).toBe('a string');
            expect(function () { service.role({}); }).toThrow(thrown({}));
            expect(function () { service.role([]); }).toThrow(thrown([]));
            expect(function () { service.role(1); }).toThrow(thrown(1));
            expect(function () { service.role(false); }).toThrow(thrown(false));
        });
    });

    describe('#field', function field() {
        exists('field');
        it('returns a Field object when passed a legitimate field name.', function () {
            expect(service.field('region').constructor)
                .toBe(services.conceptProposalServiceField.Field);
            expect(service.field('region').name()).toBe('region');
        });
        it('creates a new field when one does not exist.',
        function createsAField() {
            spyOn(services.conceptProposalServiceField, 'create').and.callThrough();
            service.field('non-existent-field-name');
            expect(services.conceptProposalServiceField.create).toHaveBeenCalled();
        });
        xit('throws an error when passed a non-existent field name.', function throwsAnError() {
            expect(function expectThrow() { service.field('a string'); }).toThrow(new Error([
                'conceptProposalServiceConcept.field: Invalid field name "',
                'a string',
                '".'
            ].join('')));
        });
    });

    describe('#fields', function fields() {
        exists('fields');
        it('returns an array.', function returnsAnArray() {
            expect(service.fields().constructor).toBe([].constructor);
        });
        xit([
            'returns the field object array as they are loaded from the API.'
        ].join(''), function returnsFieldObjectArray() {
            services.$httpBackend.expectPOST([
                '/sonycpocc/v2/sonycp/concepts/validate'
            ].join(''), services.sharedDataServiceConcept).respond({
                formFields: [
                    {
                        fieldCode: 'test',
                        visible: true
                    }
                ],
                validationFields: [
                    {
                        fieldCode: 'test',
                        required: true
                    }
                ]
            });
            service.validate().then(function validateResolve() {
                expect(service.fields().map(function forEachField(field) {
                    return field.name();
                })).toEqual([
                    services.conceptProposalServiceField.create('test', {
                        visible: true,
                        required: true
                    }).name()
                ]);
            });
            services.$httpBackend.flush();
        });
    });

    describe('#message', function message() {
        exists('message');
        xit('returns the message for the key into it.', function returnsMessageForKey() {
        });
    });

    describe('#save', function save() {
        exists('save');
    });
});
