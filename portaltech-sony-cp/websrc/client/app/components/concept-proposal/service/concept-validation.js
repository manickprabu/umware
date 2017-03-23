'use strict';

//User object holds all user information.
angular.module('conceptProposal').service('conceptValidationService',
    function conceptValidationService( $state, $filter, conceptCommonServicePageFields, $uibModal, conceptCommonServiceField )
    {
        //redirect different route, when submit has any error
        function navigatePage(pageId, conceptId) {
            var states = ['information', 'platform', 'compliance'];

            // when its new concept
            if ($state.includes('index.concept.proposal')) {
                // when its server-side validation error 
                if(conceptId > 0) {
                    $state.go('index.concept.draft.' + states[pageId], { conceptId:conceptId });
                }
                // front-end validation error
                else {
                    $state.go('index.concept.proposal.' + states[pageId]);
                }
            }
            // when its draft with front-end && back-end validation error
            // use concept id from $stateParams.conceptId
            else if($state.includes('index.concept.draft')) { 
                conceptId = (conceptId > 0) ? conceptId : $state.params.conceptId;
                $state.go('index.concept.draft.' + states[pageId], { conceptId:conceptId });
            }
        }


        //validate all 3 page before submit get call
        function validateAllPage() {
            var valid = true;
            for(var pageId=0; pageId<3; pageId++) {
                valid = conceptCommonServicePageFields.validatePage(pageId, true);
                
                if(valid == false) {
                    navigatePage(pageId, -1);
                    break;
                }
            }

            return valid;
        }

        //notify user when there is error during server-side validation 
        function notifiyErrorMsg(responseData) {

            //only if there is any duplicated concept exist via 'notification'
            if(responseData.notifications) {
                var modalInstance = $uibModal.open({
                    id: 'modalAccountManager',
                    animation: true,
                    templateUrl: 'app/components/concept-proposal/partial/popover/concept-error-dialog.html',
                    controller: 'ConceptErrorConformController',
                    controllerAs: 'conceptErrorConformController',
                    windowClass: "center-modal",
                    resolve: {
                        message: function(){
                            return $filter('messageBundle')('notification.concept.name.duplicate')
                        }
                    }
                  });

                //validate user responce 
                modalInstance.result.then(function (result) {
                    //YES: edit original concept 
                    //TODO if more than one notifications
                    navigatePage(0, responseData.notifications[0].data[0].value);
                }, function (result) {
                    //NO: redirect user to errored page to edit;
                    handleServerSideError(responseData);
                });

            } else {
                handleServerSideError(responseData);
            }

            
        }

        //handle if the user want to correct server-side errord field
        //then redirect respective page.
        function handleServerSideError(responseData) {
            // The redirection state is the first page list of proposal fields
            // which matches a validation field coming from the validation
            // fields list given in the rejection response.
            // Using Math.min to find the smallest number in the array.
            // Feeding the return straight into the navigatePage function.
            navigatePage(Math.min.apply(Math, responseData.validationFields
            .map(function (validationField) {
                // Relevant field needs to be given the appropriate error message.
                conceptCommonServiceField.field(validationField.fieldCode)
                    .getRequiredMessage($filter('messageBundle')(validationField.errorMessage));

                // This is an array map of page number ids.
                return conceptCommonServicePageFields.pageFieldList.map(function (fields, idx) {
                    // Mapping an array of objects to keep the array index as the
                    // page number.
                    return {
                        idx: idx,
                        fields: fields
                    };
                }).filter(function (obj) {
                    // If the validation field is in the list of fields
                    return obj.fields.indexOf(validationField.fieldCode) > -1;
                }).map(function (obj) {
                    // Return the page numbers.
                    return obj.idx;
                });
            })));
        }


        return {
            notifiyErrorMsg : notifiyErrorMsg,
            validateAllPage : validateAllPage
        }
    }
);
