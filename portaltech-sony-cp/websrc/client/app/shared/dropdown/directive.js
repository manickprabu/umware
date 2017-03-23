// Directive for shared dropdown
// Dependencies:Module,sharedOptionsFactory(factory.js),isolated scope,template and controller)
angular.module('sharedDropdown')
.controller('sharedDropdownController', function controller(
    $attrs,
	sharedOptionsFactory,
    sharedDropdownFactoryFirst,
    sharedDropdownFactoryCore
) {
    var data = {
        open: false
    };

    if (
        !this.dropdown ||
        this.dropdown.constructor !== sharedDropdownFactoryCore().constructor
    ) {
        throw new Error([
            'sharedDropdown directive:',
            'Attribute value must be passed a sharedDropdownFactoryCore instance.'
        ].join(' '));
    }

    if (
        $attrs.$attr.firstItem !== undefined &&
        (
            this.firstItem === undefined ||
            this.firstItem.constructor !== sharedDropdownFactoryFirst().constructor
        )
    ) {
        throw new Error([
            'sharedDropdown directive:',
            'first-item attribute must be passed a sharedDropdownFactoryFirst instance.'
        ].join(' '));
    }

    this.outsideClick = function outsideClick() {
        this.open(false);
    };

    this.open = function open(value) {
        // If argument is provided and dropdown is not disabled, set value of 'open'.
        if (value !== undefined && !this.dropdown.disable()) {
            data.open = value;
        }
        return data.open;
    };
    this.select = angular.bind(this, function select(value) {
        this.dropdown.model(value);
        this.open(false);
    });

    this.reset = angular.bind(this, function reset() {
        this.search = '';
    });
}).directive('sharedDropdown', function sharedDropdown() {
    return {
        restrict: 'A',
        scope: {
            dropdown: '=sharedDropdown',
            firstItem: '=',
            multiSelect: '='
        },
        templateUrl: 'app/shared/dropdown/partial/index.html',
        bindToController: true,
        controllerAs: 'sharedDropdownController',
        controller: 'sharedDropdownController'
    };
});
