angular.module('sharedCheckbox').directive('sharedCheckbox', function sharedCheckbox() {
    return {
        restrict: 'A',
        scope: {
            checkboxes: '=sharedCheckbox'
        },
        bindToController: true,
        controllerAs: 'sharedCheckboxController',
        controller: 'sharedCheckboxController',
        templateUrl: 'app/shared/checkbox/partial.html'
    };
}).controller('sharedCheckboxController',
function sharedCheckboxController(sharedMultiSelectFactory) {
    if (!this.checkboxes || this.checkboxes.constructor !== sharedMultiSelectFactory().constructor) {
        throw new Error([
            'sharedCheckbox: Attribute value needs a sharedMultiSelectFactory instance.'
        ].join(''));
    }
});
