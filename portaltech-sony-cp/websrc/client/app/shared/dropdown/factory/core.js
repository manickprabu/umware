angular.module('sharedDropdown').factory('sharedDropdownFactoryCore',
function sharedDropdownFactoryCore(sharedInstantiatorFactory, sharedSingleSelectFactory, sharedMultiSelectFactory) {
    function Dropdown() {
        var placeholder = 'Select an option';
        var disable = false;
        var search = false;
        this.placeholder = function getSetPlaceholder(value) {
            if (value !== undefined) {
                if (typeof value === 'string') {
                    placeholder = value;
                } else {
                    throw new Error([
                        'sharedDropdownInstance.placeholder:',
                        'Expecting a string parameter, but was passed a ',
                        (typeof value)
                    ].join(' '));
                }
            }
            return placeholder;
        };
        this.disable = function (value) {
            if (value !== undefined) {
                disable = value;
            }
            return disable;
        };
        this.search = function (value) {
            if (value !== undefined) {
                search = value;
            }
            return search;
        };
    }
    return function factory(items, options) {
        var obj;
        var factory = sharedSingleSelectFactory;
        if (options) {
            if (options.multiSelect) {
                factory = sharedMultiSelectFactory;
            }
            delete options.multiSelect;
        }
        var opts = angular.extend({}, options || {});
        if (options) {
            [
                'placeholder',
                'disable',
                'search'
            ].forEach(function del(prop) {
                delete options[prop];
            });
        }
        Dropdown.prototype = factory(items, options);
        obj = new Dropdown;
        return sharedInstantiatorFactory(obj, opts);
    };
});
