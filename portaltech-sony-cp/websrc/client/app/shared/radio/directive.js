angular.module('sharedRadio').directive('sharedRadio', function sharedRadio(sharedSingleSelectFactory) {
    return {
        restrict: 'A',
        scope: {
            options: '=sharedRadio'
        },
        templateUrl: 'app/shared/radio/index.html',
        bindToController: true,
        controllerAs: 'sharedRadioController',
        controller: function controller() {
            if (
                !this.options ||
                this.options.constructor !== sharedSingleSelectFactory().constructor
            ) {
                throw new Error([
                    'sharedRadio directive:',
                    'Attribute must be passed a sharedSingleSelectFactory instance.',
                    (
                        this.options ?
                        this.options.constructor.name + ' provided instead.' :
                        'No attribute provided.'
                    )
                ].join(' '));
            }
        }
    };
});
