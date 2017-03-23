angular.module('conceptWidget').service('conceptWidgetServiceProposedPlatform',
function conceptWidgetServiceProposedPlatform(
    sharedMultiSelectFactory,
    conceptCommonServiceAPI,
    conceptCommonServiceField,
    conceptCommonServicePageFields
) {
    // Single select factory instances
    this.instance = sharedMultiSelectFactory([]);

    // Resolution function to be run by core config service when API has completed.
    conceptCommonServiceAPI.config().then(angular.bind(this, function resolution(response) {
        var platforms = response.data.platforms;
        var value = conceptCommonServiceField.field('proposal.plannedPlatforms').value;
        this.instance.list(platforms.map(function list(platform) {
            return angular.extend(platform, {
                label: platform.name,
                value: platform.id
            });
        }));

        // This is where the platform template should go.
        // Generates an empty platform object.
        function plannedPlatform(id) {
            return {
                plannedDistributionMedia: [],
                plannedLanguages: [],
                plannedRegions: [],
                platform: platforms.filter(function filter(platform) {
                    return platform.id === id;
                })[0]
            };
        }

        this.instance.value(function instanceValue(ids) {
            // Must set an array of objects based on the ids being set.
            if (ids !== undefined) {

                // if in value()
                // but not in ids
                // then field.active(false)
                // we check if any platform are removed and we are de-active all its fields
                (value() || []).filter(function (platform) {
                    return ids.indexOf(platform.platform.id) === -1;
                }).forEach(function (platform) {
                    var fieldList = conceptCommonServicePageFields.getFieldList(platform.platform.code);
                    
                    angular.forEach(fieldList, function(fieldCode) {
                         conceptCommonServiceField.field(fieldCode).active(false);
                    })
                });
                

                value(ids.map(function field(id) {
                    // Includes objects for all ids being set.
                    // If the object is already in the array, it is returned in the field value.
                    // If not, the template function is used.

                    //we always inharit with empty platform object
                    return angular.extend(plannedPlatform(id) , (value() || []).filter(function filter(platform) {
                        return (platform.platform || {}).id === id;
                    })[0] || {});

                    // return (value() || []).filter(function filter(platform) {
                    //     return (platform.platform || {}).id === id;
                    // })[0] || plannedPlatform(id);
                }));

                console.log('widget', value());

                //update required field-set - to page validation 
                conceptCommonServicePageFields.updateRequiredField();

                
            }

            // Must return an array of ids.
            return (value() || []).map(function map(platform) {
                return (platform.platform || {}).id;
            });
        });
    }));
});
