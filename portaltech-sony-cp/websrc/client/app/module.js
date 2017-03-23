// Application-wide module
angular.module('application', [
    // 3rd party modules
    'ui.router',
    'ui.bootstrap.modal',
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',
    'angularFileUpload',
    'messageBundle',

    // Custom modules
    'authentication',
    'conceptProposal',
    'conceptOverview',
    'notification',
    'wp3-product-group'
]);

// Concept Proposal module
angular.module('conceptProposal', [
    'clickOutside',
    'sharedDropdown',
    'sharedRadio',
    'sharedCheckbox',
    'sharedTextfield',
    'sharedClientValidation',
    'sharedAccordion',
    'sharedFile',
    'sharedFileList',
    'sharedPaginator',
    'sharedSelectedPills',
    'sharedActivePills',
    'sharedData', // Temporary measure to test concepts until API is running.

    'sharedAPI',
    'conceptCommon',
    'conceptListing',
    'oauth2',
    'documents',
]);

// OAuth2
angular.module('oauth2', [
    'ngCookies',
    'angular-oauth2'
]);

// Authentication
angular.module('authentication', [
    'oauth2',
    'ui.router'
]);

angular.module('notification', [
    'oauth2',
    'sharedAPI'
]);


// Shared modules

// API
angular.module('sharedAPI', []);
angular.module('sharedInstantiator', []);
angular.module('sharedOptions', [
    'sharedInstantiator'
]);
angular.module('sharedSingleSelect', [
    'sharedOptions'
]);
angular.module('sharedRadio', [
    'sharedOptions'
]);
angular.module('sharedDropdown', [
    'sharedSingleSelect',
    'sharedMultiSelect'
]);
angular.module('sharedMultiSelect', [
    'sharedOptions'
]);
angular.module('sharedCheckbox', [
    'sharedMultiSelect'
]);

// Todo: Safely remove this module and anything depending on it.
angular.module('sharedData', []);

angular.module('sharedAccordion', []);

angular.module('sharedActivePills', []);

angular.module('sharedFile', []);

angular.module('sharedFileList', []);

angular.module('sharedPaginator', []);

angular.module('sharedSelectedPills', []);



// Shared Text Fields module
angular.module('sharedTextfield', []);


// Shared Client Validation
angular.module('sharedClientValidation', []);


// Shared Popovers
angular.module('sharedPopover', []);
