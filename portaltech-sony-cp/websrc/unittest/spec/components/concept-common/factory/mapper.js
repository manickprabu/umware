describe('conceptCommonFactoryMapper', function () {
    var factory;
    function mock() {
        return {
            x: {
                y: [
                    {
                        id: 'z',
                        w: 2
                    },
                    {
                        id: 'a',
                        w: 3
                    }
                ]
            }
        };
    }
    function cases() {
        return {
            'x': mock().x,
            'x.y': mock().x.y,
            'x.y[z]': mock().x.y[0],
            'x.y[z].w': mock().x.y[0].w,
            'x.y[a]': mock().x.y[1],
            'x.y[a].w': mock().x.y[1].w
        };
    }
    function filter(name, id, item) {
        return item.id === id;
    }

    beforeEach(function () {
        module('conceptCommon');
        inject(function ($injector) {
            factory = $injector.get('conceptCommonFactoryMapper');
        })
    });

    it('is a function.', function () {
        expect(typeof factory).toBe('function');
    });

    describe('finds the correct value', function () {
        Object.keys(cases()).forEach(function forEachCase(reference) {
            describe('for ' + reference, function () {
                it('and returns it.', function () {
                    expect(factory(mock(), reference, undefined, filter)).toEqual(cases()[reference]);
                });
                describe('and can set it', function () {
                    if ([ 'x.y[z]', 'x.y[a]' ].indexOf(reference) > -1) {
                        [
                            {
                                id: 'a',
                                w: 10
                            },
                            {
                                id: 'z',
                                w: 11
                            }
                        ].forEach(function (value) {
                            it('to ' + value + ' for array element references.', function () {
                                var mockInstance = mock();
                                expect(factory(mockInstance, reference, value, filter)).toEqual(value);
                                expect(factory(mockInstance, reference, undefined, filter)).toEqual(value);
                            });
                        });
                    } else {
                        [
                            0,
                            1,
                            2,
                            {},
                            {
                                b: 4
                            },
                            [
                                {
                                    c: 5
                                }
                            ]
                        ].forEach(function (value) {
                            it('to ' + value + ' for non-array element references.', function () {
                                var mockInstance = mock();
                                expect(factory(mockInstance, reference, value, filter)).toEqual(value);
                                expect(factory(mockInstance, reference, undefined, filter)).toEqual(value);
                            });
                        });
                    }
                });
            });
        });
    });
});
