angular.module('conceptCommon').factory('conceptCommonFactoryField',
function conceptCommonFactoryField() {
    function Field() {
        // Data appearing in getter/setter functions.
        var data = {
            name: '',
            required: false,
            triggerUpdate: false,
            visible: false,
            value: undefined,
            label: '',
            information: '',
            update: [],
            active: true
        };

        // Special interception functions where setting requires special behaviour.
        var set = {
            update: function update(_value) {
                // Update runs multiple functions.
                data.update.push(_value);
                return data.update;
            },
            required: function required(_value) {
                if ([true, false].indexOf(_value) === -1) {
                    throw new Error([
                        'conceptProposalServiceField.Field instance.required:',
                        'Argument must be boolean, found',
                        (typeof _value)
                    ].join(' '));
                }
                return _value;
            }
        };
        var update = {
            value: angular.bind(this, function value(options) {
                // When a field value is set the update functions are run.
                if (!options || !options.noupdate) {
                    data.update.forEach(angular.bind(this, function runUpdate(fnc) {
                        fnc(this);
                    }));
                }
            })
        };

        // Nasty hack to handle required message output
        data.requiredMessage = '';
        data.getRequiredMessage = '';
        // End of nasty hack

        // Sets up all the getter/setter functions based on the data properties.
        Object.keys(data).forEach(angular.bind(this, function setup(prop) {
            set[prop] = set[prop] || function interceptorSet(_value) { return _value; };
            update[prop] = update[prop] || function interceptorUpdate() {};
            this[prop] = angular.bind(this, function getterSetter(_value, options) {
                if (_value !== undefined) {
                    data[prop] = set[prop](_value, options);
                    update[prop](options);
                }
                return data[prop];
            });
        }));

        this.messages = function messagesGetter() {
            return {
                validation: function validationGetter() {
                    return [];
                }
            };
        };
        this.empty = function empty() {
            return (
                typeof data.value === 'object'
                && data.value.constructor === [].constructor
                && data.value.length === 0
            ) || data.value === undefined
            || data.value === '';
        };
        // Todo: Safely remove this.
        this.render = function render() {
            return [];
        };
        this.reset = function reset() {
            if (typeof data.value === 'object') {
                if (data.value.constructor === [].constructor) {
                    data.value = [];
                } else {
                    data.value = undefined;
                }
            } else {
                data.value = undefined;
            }
        };
    };

    return function instantiate(name, options) {
        var field = new Field;
        field.name(name);
        if (options) {
            [
                'value',
                'label',
                'visible',
                'triggerUpdate',
                'required',
                'requiredMessage',
                'update',
                'information'
            ].forEach(function forEach(prop) {
                field[prop](options[prop]);
            });
        }
        return field;
    };
});
