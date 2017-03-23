angular.module('conceptOverview').service('conceptOverviewServicePlatforms',
function conceptOverviewServicePlatforms(
    conceptCommonServiceAPI,
    conceptCommonServiceField
) {
    // Available platforms
    var available = [];

    // Populate available platforms from config.
    conceptCommonServiceAPI.config().then(function then(response) {
        available = response.data.platforms;
    });

    // Return array of selected planned platform objects including platform configuration
    // (e.g. name property).
    function planned() {
        return conceptCommonServiceField.field('proposal.plannedPlatforms').value().map(
        function map(selectedPlatform) {
            return angular.extend(selectedPlatform, available.filter(function (availablePlatform) {
                return availablePlatform.id === selectedPlatform.id;
            })[0] || {});
        });
    }

    angular.extend(this, {
        planned: planned
    });
});
