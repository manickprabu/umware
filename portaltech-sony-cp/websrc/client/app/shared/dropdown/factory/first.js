// Factory to keep a format of the first item which should be submitted into the dropdown listing.
angular.module('sharedDropdown').factory('sharedDropdownFactoryFirst',
function sharedDropdownFactoryFirst() {
    function First() {
        var data = {
            label: '(Unlabelled)',
            click: function clickFunction() {}
        };
        var typeCheck = {
            click: 'function',
            label: 'string'
        };
        Object.keys(data).forEach(angular.bind(this, function (prop) {
            this[prop] = function getterSetter(value) {
                if (value !== undefined) {
                    if (typeof value === typeCheck[prop]) {
                        data[prop] = value;
                    } else {
                        throw new Error([
                            'sharedDropdownFactoryFirst(instance).',
                            prop,
                            ': Argument must be a ',
                            typeCheck[prop],
                            ', ',
                            (typeof value),
                            ' provided.'
                        ].join(''));
                    }
                }
                return data[prop];
            };
        }));
    }
    return function factory(label, click) {
        var first = new First;
        first.label(label);
        first.click(click);
        return first;
    };
});
