// Directive for previous and next buttons.
angular.module('conceptProposal').directive('conceptProposalPrevNext',
function conceptProposalPrevNext(
    $window,
    conceptCommonServiceField,
    conceptCommonServicePageFields,
    $stateParams
) {
    return {
        restrict: 'A',
        templateUrl: 'app/components/concept-proposal/partial/directive/next-prev.html',
        controllerAs: 'conceptProposalControllerPrevNext',
        controller: function controller($state) {
            // Base state set up, including draft and proposal conditions, where the conceptId
            // needs to be.
            var baseState = [
                'index.concept',
                $stateParams.conceptId > -1 ? 'draft' : 'proposal'
            ];

            // List of all states to navigate.
            var states = [
                'information',
                'platform',
                'compliance'
            ].map(function stateMap(stateChunk) {
                return baseState.concat([stateChunk]).join('.');
            });

            // Special case functions where previous/next have entirely different functionality.
            var special = { Next: {} };

            // Returns whether the required fields in the current view are not empty.
            function requiredNotEmpty() {
                return conceptCommonServicePageFields.validatePage($state.params.page);
            }

            // A common requirement for these functions is to get the numeric state array
            // index.
            function idx(offset) {
                return states.indexOf($state.current.name) + offset;
            }

            // Changes routing state if the conditions are right.
            function go(offset) {
                var name = states[idx(offset)];
                var requiredField = requiredNotEmpty();
                if (offset === -1 || (name && requiredField)) {
                    $state.go(name);
                    $window.scrollTo(0, 0);
                }
            }

            // Whether the button should show or not.
            function show(offset) {
                var id = idx(offset);
                return id >= 0 && id < states.length;
            }

            // Disabled state for next button.
            special.Next.disabled = function disabled() {
                return !requiredNotEmpty();
            };

            // Both buttons are configured into an array to be displayed.
            this.buttons = [{
                label: 'Previous',
                cssClass: 'btn-link',
                type: 'button'
            }, {
                label: 'Next',
                cssClass: 'btn-primary',
                type: 'submit'
            }].map(function buttonsMap(btn, btnIDX) {
                // The offset id describes the direction of travel in the pages (e.g. -1/1).
                var offset = -1 + (2 * btnIDX);

                // Constructs an object for the button.
                return angular.extend({
                    label: btn.label,
                    cssClass: btn.cssClass,
                    type: btn.type,
                    go: function goWrapper() {
                        go(offset);
                    },
                    show: function showWrapper() {
                        return show(offset);
                    }
                }, special[btn.label] || {});
            });
        }
    };
});
