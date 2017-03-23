// Takes an array of objects, each of which should have a 'label' and 'active' property.
// Example: [{label: 'Stuff', active: true}].
angular.module('sharedSelectedPills').directive('sharedSelectedPills', function () {
    return {
        scope: {
            pills: '=sharedSelectedPills'
        },
        bindToController: true,
        templateUrl: 'app/shared/selected-pills/index.html',
        controllerAs: 'sharedSelectedPillsController',
        controller: function () {
            if (this.pills && this.pills.constructor === [].constructor) {
                this.pills.forEach(function forEachPill(pill) {
                    pill.label = pill.label || '(Pill has no "label" property)';
                    pill.class = {
                        'label-active': pill.active,
                        'label-disabled': !pill.active
                    };
                });
            } else {
                throw new Error('sharedSelectedPillsController: Attribute value must be an array.');
            }
        }
    };
});
