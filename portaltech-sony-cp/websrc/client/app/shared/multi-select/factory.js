angular.module('sharedMultiSelect').factory('sharedMultiSelectFactory',
function sharedMultiSelectFactory(sharedOptionsFactory, sharedInstantiatorFactory) {
    function MultiSelect() {
        var data = {
            update: undefined
        };
        // Needs a model function because it's not binding.
        this.select = angular.bind(this, function select() {
            // Always return the object based on the selected value property.
            var value = this.value()() || [];
            return this.list().filter(angular.bind(this, function filter(item) {
                return value.indexOf(item.value) > -1;
            }));
        });
        // Consider a different approach: set a name to true or false,
        // or put the name in and get the state.
        this.update = function update(value) {
            if (value) { data.update = value; }
            return data.update;
        };
        this.model = angular.bind(this, function (value) {
            return angular.bind(this, function (state) {
                var fieldValue = this.value()() || [];
                var idx = fieldValue.indexOf(value);
                var initialState = idx > -1;
                var changed = false;
                if (state !== undefined) {
                    if (initialState && !state) {
                        // Remove
                        fieldValue.splice(idx, 1);
                        changed = true;
                    } else if (!initialState && state) {
                        // Add
                        fieldValue.push(value);
                        changed = true;
                    }
                    if (changed) {
                        this.value()(fieldValue);
                    }
                }
                return initialState;
            });
        });
        this.change = angular.bind(this, function change() {
            if (typeof data.update === 'function') {
                data.update(this);
            }
        });
    }
    return function factory(list, options) {
        var multiSelect;
        MultiSelect.prototype = sharedOptionsFactory.call(factory.arguments);
        multiSelect = new MultiSelect;
        return sharedInstantiatorFactory(multiSelect, angular.extend({
            list: list
        }, options), [
            'list',
            'select'
        ]);
    };
});
