angular.module('conceptWidget').service('conceptWidgetServiceRegions',
function conceptWidgetServiceRegions(
    sharedMultiSelectFactory,
    conceptCommonServiceField
) {
    this.instance = sharedMultiSelectFactory([]);
    this.resolution = angular.bind(this, function resolution(response) {
        // Assign the list of regions to the multi select factory.
        this.instance.list(response.data.regions.map(function map(region) {
            return angular.extend(region, {
                value: region.code,
                label: region.name
            });
        }));

        // Assigning the getter/setter function to the Field value.
        this.instance.value(function getterSetter(ids) {
            // Abbreviating the getter/setter function.
            var value = conceptCommonServiceField.field('proposal.regions').value;
            if (ids !== undefined) {
                // Expecting ids to be set as an array of keys.
                value(ids.filter(function filter(id) {
                    // The ids have a tendency to include an undefined array element,
                    // so this needs to be filtered out.
                    // Todo: Look into sharedMultiSelectFactory to find issue.
                    return id !== undefined;
                }).map(function map(id) {
                    // Data-side needs to have code/name objects, based on configuration regions.
                    return {
                        code: id,
                        name: response.data.regions.filter(function filter(region) {
                            return region.code === id;
                        })[0].name
                    };
                }));
            }

            // Return a map against the region isocodes.
            return (value() || []).map(function map(obj) {
                return obj.code;
            });
        });
    });
});
