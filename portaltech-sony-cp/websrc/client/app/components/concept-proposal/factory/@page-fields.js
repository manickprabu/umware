angular.module('conceptProposal').factory('conceptProposalFactoryPageFieldsDELETED', function () {
    // A list of all possible required fields on their respective pages.
    // This is to handle next button validation functionality.
    return [
        [
            'franchise',
            'proposal.regions',
            'leadRoles',
            'conceptType',
            'nameEN',
            'superGenre',
            'categoryGenre',
            'proposal.targetAge'
        ],
        [
            'proposal.plannedPlatforms'
        ],
        [
            'compliance.occCompliance',
            'compliance.occComplianceComment',
            'compliance.virtualCurrencyCompliance',
            'compliance.virtualCurrencyComplianceComment',
            'compliance.legalDisclaimerAccepted',
            'concept.overview.internalReview'
        ]
    ];
});
