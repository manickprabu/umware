angular.module('conceptWidget').service('conceptWidgetServiceLeadRoles',
function conceptWidgetServiceLeadRoles(
    sharedSingleSelectFactory,
    messageBundleServiceCore,
    conceptCommonServiceAPI,
    conceptCommonServiceField
) {
    var instance = sharedSingleSelectFactory([]);

    // Single select factory instances
    // Todo: attempt to remove. Should no longer be needed unless overview still uses
    // deviant pattern.
    this.instance = instance;

    // When the config has loaded, we need to populate the widget options.
    conceptCommonServiceAPI.config().then(function then(response) {
        // The roles that come from the back-end.
        var configRoles = response.data.partnerRoles;

        // The key for the 'Both' option.
        var bothKey = 'BOTH';

        // Setting up the list of items in the role radio options.
        instance.list(configRoles.map(function map(role) {
            // All config objects.
            return {
                label: messageBundleServiceCore.message('concept', [
                    'leadRoles',
                    role,
                    'name'
                ].join('.')),
                value: role
            };
        }).concat([
            // Adding the 'both' option.
            {
                label: messageBundleServiceCore.message('concept', 'leadRoles.Both.name'),
                value: bothKey
            }
        ]));

        // Setting the widget value function.
        instance.value(function getterSetter(id) {
            // Alias for field value function.
            var value = conceptCommonServiceField.field('leadRoles').value;

            // A variable to keep the config role field values.
            var values;

            // When setting the radio option...
            if (id !== undefined) {
                // Remove all config roles to retain concept lead.
                // Then append both roles from the config if 'both' is selected.
                value((value() || []).filter(function findNonConfig(role) {
                    return configRoles.indexOf(role) === -1;
                }).concat(id === bothKey ? configRoles : [id]));
            }

            // Get all the config roles in the field value.
            values = (value() || []).filter(function findConfig(role) {
                return configRoles.indexOf(role) > -1;
            });

            // If all the config roles are selected, return 'both'.
            return values.length === configRoles.length ? bothKey : values[0];
        });
    });
});
