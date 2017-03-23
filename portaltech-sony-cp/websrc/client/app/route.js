'use strict';

// This file will handle all the routes and the route configuration for the Concept Proposal Module.
angular.module('application').config(function config($stateProvider) {
    // A complete set of states that might be repeated. This is a function to ensure new objects
    // are generated.
    function states() {
        return {
            index: {
                concept: {
                    // This applies to both proposal and draft states, which deal with a
                    // singular concept.
                    singular: {
                        information: {
                            url: '/information',
                            views: {
                                '': {
                                    templateUrl: 'app/components/concept-proposal/partial/information.html',
                                    controller: 'conceptProposalControllerInformation',
                                    controllerAs: 'conceptProposalControllerInformation'
                                },
                                // Todo: Find out if this view is actually working or in use.
                                'partner@index.concept.information': {
                                    templateUrl: partial('concept-proposal', 'view/information-partner.html'),
                                    controller: 'conceptProposalControllerInformationPartner',
                                    controllerAs: 'conceptProposalControllerInformationPartner'
                                }
                            },
                            params: {
                                page: 0
                            }
                        },
                        platform: {
                            url: '/platform',
                            templateUrl: 'app/components/concept-platform/partial/platform.html',
                            controller: 'conceptProposalControllerPlatform',
                            controllerAs: 'conceptProposalControllerPlatform',
                            params: {
                                page: 1
                            }
                        },
                        compliance: {
                            url: '/compliance',
                            templateUrl: 'app/components/concept-proposal/partial/compliance.html',
                            controller: 'conceptProposalControllerCompliance',
                            controllerAs: 'conceptProposalControllerCompliance',
                            params: {
                                page: 2,
                                showSubmit: true
                            }
                        }
                    }
                }
            }
        };
    }

    function partial(moduleName, path) {
        return [
            'app/components/',
            moduleName,
            '/partial/',
            path
        ].join('');
    }

    $stateProvider
        .state('index', {
            url: '',
            // abstract: true,
            templateUrl: 'app/components/application/partial.html',
            redirectTo: 'index.concept.listing'
        })

        // A state to prevent 404 in root url.
        .state('index.home', {
            url: '/',
            template: '<data-ui-view/>',
            redirectTo: 'index.concept.listing'
        })

        // Concept Proposal: Core concept information
        .state('index.concept', {
            url: '/concept',
            views: {
                '': {
                    controller: 'conceptProposalControllerIndex',
                    controllerAs: 'conceptProposalControllerIndex',
                    templateUrl: partial('concept-proposal', 'index.html')
                },
                'header@index.concept': {
                    templateUrl: partial('concept-proposal', 'view/header.html'),
                    controller: 'conceptProposalControllerHeader',
                    controllerAs: 'conceptProposalControllerHeader'
                }
            },
            abstract: true,
            resolve: {
                //resolve all application level end-point to makesure avilable before applicaiton ready
                message: function message(messageBundleServiceCore) {
                    return messageBundleServiceCore.resolve('concept');
                },
                config: function config(conceptCommonServiceConfig) {
                    return conceptCommonServiceConfig.resolve();
                },
                currentUser: function currentUser(User) {
                    return User.currentUser();
                },
                franchise: function franchise(conceptCommonServiceFranchise) {
                    return conceptCommonServiceFranchise.fetchFranchises();
                },
            }
        })

        .state('index.concept.proposal', {
            url: '/proposal',
            views: {
                '': {
                    controller: 'conceptProposalControllerProposal',
                    controllerAs: 'conceptProposalControllerProposal',
                    templateUrl: 'app/components/concept-proposal/partial/proposal.html',
                },
                // Overrides the proposal header to be 'empty'.
                'header@index.concept': { template: '<div></div>' }
            },
            params: {
                conceptId: -1
            },
            abstract: true,
            resolve: {
                init: function init(conceptCommonServiceManager) {
                    conceptCommonServiceManager.reset();
                    return conceptCommonServiceManager.init();
                }
            }
        })

        // Concept Proposal: Concept Information
        .state('index.concept.proposal.information', states().index.concept.singular.information)

        // Concept Proposal: Proposed Platform
        .state('index.concept.proposal.platform', states().index.concept.singular.platform)

        // Concept Proposal: Compliance
        .state('index.concept.proposal.compliance', states().index.concept.singular.compliance)

        // Draft proposal
        .state('index.concept.draft', {
            url: '/draft/:conceptId',
            views: {
                '': {
                    controller: 'conceptProposalControllerProposal',
                    controllerAs: 'conceptProposalControllerProposal',
                    templateUrl: 'app/components/concept-proposal/partial/proposal.html',
                },
                // Overrides the proposal header to be 'empty'.
                'header@index.concept': { template: '<div></div>' }
            },
            abstract: true,
            resolve: {
                dto: function dto(conceptCommonServiceManager, $stateParams) {
                    return conceptCommonServiceManager.details($stateParams.conceptId).then(
                    function then() {
                        conceptCommonServiceManager.triggerUpdate();
                    });
                }
            }
        })

        // Concept Proposal: Concept Information
        .state('index.concept.draft.information', states().index.concept.singular.information)

        // Concept Proposal: Proposed Platform
        .state('index.concept.draft.platform', states().index.concept.singular.platform)

        // Concept Proposal: Compliance
        .state('index.concept.draft.compliance', states().index.concept.singular.compliance)


        // Concept Review
        .state('index.concept.overview', {
            url: '/overview/:conceptId',
            views: {
                '': {
                    templateUrl: 'app/components/concept-overview/partial/overview.html',
                    controller: 'conceptProposalControllerReview',
                    controllerAs: 'conceptProposalControllerReview'
                },
                'overviewPlatformInformation@index.concept.overview': {
                    templateUrl: partial('concept-overview', 'platform-information.html'),
                    controller: 'overviewPlatformInformationController',
                    controllerAs: 'overviewPlatformInformationController'
                },
                'coreInternalReview@index.concept.overview': {
                    templateUrl: partial('concept-overview', 'internal-review.html'),
                    controller: 'internalReviewConceptController',
                    controllerAs: 'internalReviewConceptController'
                },
                'overviewOptionView@index.concept.overview': {
                    templateUrl: partial('concept-overview', 'overview-options-dialog.html'),
                    controller: 'overviewOptionController',
                    controllerAs: 'overviewOptionController'
                },
                'overviewIndicativeInformation@index.concept.overview': {
                    templateUrl: partial('concept-overview', 'indicative-information.html'),
                    controller: 'overviewIndicativeInformationController',
                    controllerAs: 'overviewIndicativeInformationController'
                }
            },
            resolve: {
                dto: function dto(conceptCommonServiceManager,  $stateParams) {
                    return conceptCommonServiceManager.details( $stateParams.conceptId);
                }
            }
        })

        // Concept Listing
        .state('index.concept.listing', {
            url: '/listing',
            views: {
                '': {
                    templateUrl: 'app/components/concept-listing/partial/concept-listing.html',
                    controller: 'conceptProposalControllerListing',
                    controllerAs: 'conceptProposalControllerListing'
                }
            }
        })

        // Login
        .state('index.login', {
            url: '/login',
            controller: 'authenticationControllerLogin',
            controllerAs: 'authenticationControllerLogin',
            templateUrl: 'app/components/authentication/partial/login.html'
        })

        // 404 - TODO
        // .state('index.404', {
        //     url: '/*junk',
        //     templateUrl: 'app/components/concept-proposal/partial/error404.html'
        // });
});
