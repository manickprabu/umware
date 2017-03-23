angular.module('sharedInstantiator').factory('sharedInstantiatorFactory', function () {
    return function (instance, options) {
        if (typeof instance !== 'object') {
            throw new Error([
                'sharedInstantiatorFactory(instance, options, validOptions):',
                'requires an object as the first argument.',
                typeof instance,
                'passed.'
            ].join(' '));
        }
        if (typeof options === 'object') {
            Object.keys(options).forEach(function forEach(prop) {
                if (instance[prop]) {
                    instance[prop](options[prop]);
                } else {
                    throw new Error([
                        'sharedInstantiatorFactory(instance, options, validOptions): ',
                        'Instance property "',
                        prop,
                        '" is not a function of the ',
                        instance.constructor.name,
                        ' class.'
                    ].join(''));
                }
            });
        } else {
            throw new Error([
                'sharedInstantiatorFactory(instance, options, validOptions):',
                '"options" argument should be an object. Passed a',
                (typeof options)
            ].join(' '));
        }
        return instance;
    };
});
