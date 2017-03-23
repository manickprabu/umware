angular.module('sharedSingleSelect').factory('sharedSingleSelectFactory',
function sharedSingleSelectFactory(sharedOptionsFactory, sharedInstantiatorFactory) {
    function SingleSelect() {
        var data = {
            update: undefined
        };
        this.select = angular.bind(this, function select() {
            // Always return the object based on the selected value property.
            return this.list().filter(angular.bind(this, function filter(item) {
                return item.value + '' === this.value()() + '';
            }))[0] || {};
        });
        this.model = angular.bind(this, function model(value) {
            if (value !== undefined) {
                this.value()(value);

                if (typeof data.update === 'function') {
                    data.update(this);
                }
            }
            return this.value()();
        });
        this.update = function update(value) {
            if (value) { data.update = value; }
            return data.update;
        };
    }
    return function factory(list, options) {
        var singleSelect;
        SingleSelect.prototype = sharedOptionsFactory.call(factory.arguments);
        singleSelect = new SingleSelect;
        return sharedInstantiatorFactory(singleSelect, angular.extend({
            list: list
        }, options), [
            'list',
            'select'
        ]);
    };
});
