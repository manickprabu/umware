angular.module('sharedOptions').factory('sharedOptionsFactory',
function sharedOptionsFactory(sharedInstantiatorFactory) {
    function Options() {
        var data = {
            cls: function dataCls() {},
            value: function dataValue(_value) { return _value; },
            list: []
        };
        this.cls = function cls(value) {
            if (typeof value === 'function') {
                data.cls = value;
            }
            return data.cls;
        };
        this.list = function getSetList(obj) {
            // Exception
            var Cls = data.cls;
            if (obj !== undefined) {
                if (typeof obj !== 'object') {
                    throw new Error([
                        'sharedOptionsFactory.list: Can only be passed an object.',
                        (typeof obj),
                        'found.'
                    ].join(' '));
                }
                // Array list expected
                data.list = [];

                if(Array.isArray(obj) === true) {
                    data.list = obj;
                } else {
                    angular.forEach(obj, function forEachProperty(label, value) {
                        var item = new Cls();
                        item.label = label;
                        item.value = value;
                        data.list.push(item);
                    });
                }
            }
            return data.list;
        };
        this.value = function value(_value) {
            if (typeof _value === 'function') {
                data.value = _value;
            }
            return data.value;
        };

        this.list({});
    }
    return function factory(items, options) {
        var obj = new Options;
        if (items) {
            obj.list(items);
        }
        return sharedInstantiatorFactory(obj, options || {}, [
            'list',
            'value'
        ]);
    };
});
