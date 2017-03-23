angular.module('conceptProposal').directive('conceptProposalModalEdit',
function conceptProposalModalEdit(
    conceptCommonServiceField,
    conceptWidgetServiceCore,
    messageBundleServiceCore
) {
    return {
        scope: {
            messageBundle: '@conceptProposalModalEdit',
            instance: '=',
        },
        transclude: true,
        bindToController: true,
        templateUrl: 'app/components/concept-proposal/partial/directive/modal-edit.html',
        controllerAs: 'conceptProposalControllerModalEdit',
        controller: function controller($scope) {
            // Take a copy of all the field values to be loaded back into Field objects.
            var fieldValues = conceptCommonServiceField.fields().map(function map(field) {
                return {
                    name: field.name(),
                    value: angular.copy(field.value())
                };
            });

            // Wraps the message bundle function to automatically include the bundle and provide
            // most of the key.
            this.message = function (key, placeholder) {
                return messageBundleServiceCore.message('concept', [
                    'overview.platform-information',
                    this.messageBundle,
                    'edit',
                    key
                ].join('.'), placeholder);
            };
            // Todo: consider removing config service injection.
            this.config = conceptWidgetServiceCore;
            this.close = {
                body: messageBundleServiceCore.message('concept', 'editConcept.cancelComfirmation'),
                onConfirm: angular.bind(this, function onConfirm() {
                    fieldValues.forEach(function (data) {
                        conceptCommonServiceField.field(data.name).value(data.value);
                    });
                    return this.instance.close(false);
                })
            };
            this.confirm = function() {
                this.instance.close(true);
            }
        }
    };
});
