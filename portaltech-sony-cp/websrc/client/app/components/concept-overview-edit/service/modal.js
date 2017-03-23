// This service contains a set of functions which open edit modals.
angular.module('conceptOverviewEdit').service('conceptOverviewEditServiceModal',
function conceptOverviewEditServiceModal($uibModal,
    conceptOverviewModel,
    conceptCommonServiceManager
) {
    // Each edit function opens a modal containing a specific partial and controller.
    // Partials and controllers used will conform to a pattern.
    angular.forEach({
        core: {},
        attachments: {},
        gameDesignDocument:{},
        /// Platform information tab section starts from here
        proposedPlatforms: {
            templateUrl: 'edit-platform/proposed-platforms.html'
        },
        nonPSAvailability: {
            templateUrl: 'edit-platform/platform-playstation-edit-modal.html',
        },
        // Inside accordion
        exclusiveContent: {
            templateUrl: 'edit-platform/platform-exclusive-content.html',
        },
        platformTimeline: {
            templateUrl: 'edit-platform/platform-planned-regions-edit-modal.html',
        },
        languageAndDistribution: {
            templateUrl: 'edit-platform/platform-language-distribution.html',
        },
        platformPlannedPeripherals: {
            templateUrl: 'edit-platform/platform-planned-peripherals-modal.html',
        },
        platformProposedFunctionality: {
            templateUrl: 'edit-platform/platform-proposed-functionality.html',
        },
        ////// Indicative Tab Section Starts here
        indicativeInformation: {
            templateUrl: 'edit-indicative/indicative-information.html',
        },
        indicativeInformationCompliance: {
            templateUrl: 'edit-indicative/indicative-information-compliance.html',
        },
        externalReview: {
            templateUrl: 'edit-indicative/external-review.html',
        }        
    }, angular.bind(this, function editForEach(obj, name) {
        // Assign the function to this service.
        this[name] = function edit(platformName) {

            conceptOverviewModel.platformName = platformName;
            
            // Object for opening modal.
            var open = angular.extend({
                animation: true,
                size: 'lg'
            }, obj);

            // If there is no controller given...
            if (!open.controller) {
                open.controller = 'conceptProposalControllerReviewEdit';
            }

            // If there is a controller given and it's a string...
            if (typeof open.controller === 'string') {
                // ... and the controllerAs is omitted...
                if (!open.controllerAs) {
                    // ... set the controllerAs to be the controller name.
                    open.controllerAs = open.controller;
                }
            }

            // Automatically assume the template is in overview.
            // Because that is where it should be.
            if (open.templateUrl) {
                open.templateUrl = [
                    'app/components/concept-overview/partial/',
                    open.templateUrl
                ].join('');
            } else {
                // If nothing is set, assume it's looking for a partial in the overview-edit.
                open.templateUrl = [
                    'app/components/concept-overview-edit/partial/',
                    name,
                    '.html'
                ].join('');                
            }

            // Delete the supplemental object.
            if (open.supplemental) {
                delete open.supplemental;
            }

            // Put the relevant object into the modal function to open.
            $uibModal.open(open).result.then(function then(confirm) {
                if (confirm) {
                    conceptCommonServiceManager.save();
                }
            });
        };
    }));
});
