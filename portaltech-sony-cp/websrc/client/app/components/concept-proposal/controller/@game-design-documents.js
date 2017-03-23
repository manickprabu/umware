'use strict';

conceptProposal.controller('gameDesignDocumentsController',
    function gameDesignDocumentsController(
        $scope,
        conceptProposalServiceConcept,
        conceptWidgetServiceCore
    ) {

        this.concept = conceptProposalServiceConcept;
        
        $scope.show = function() {
            return true;
        }
    }
);
