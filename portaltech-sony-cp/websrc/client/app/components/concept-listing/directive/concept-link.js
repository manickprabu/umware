
angular.module('conceptListing').directive('conceptLink',
    function(AppConfig, $state, $timeout, globalFieldsService) {
        return {
            scope:{
               concept: '=conceptLink'
            },
            link: function($scope, $element) {
                $element.on('click', function() {
                    $timeout(function() {
                        if($scope.concept.status == AppConfig.CONCEPT_STATUS.DRAFT) {
                            /*
                            * Here globalFieldsService is must, and donot change the values of true or false  
                            * The reason it is used is to set the flag to identify where this click, routing is coming from
                            * So that in  .state('index.concept', we can make decision whether draftConcept should be binded or not
                            * Use global variables to play with the flag as true or false
                            */
                            globalFieldsService.setFlag(true);

                            $state.go('index.concept.draft.information', { conceptId: $scope.concept.id}); 
                        } else {
                                                    
                            $state.go('index.concept.overview', {conceptId: $scope.concept.id} );
                        }
                    }, 0);
                });
            }
        }
    }
);